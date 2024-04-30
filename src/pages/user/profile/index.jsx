import {default as cs} from 'classnames'
import styles from './profile.module.scss'
import avatar from 'assets/avatar.svg';
import user1 from 'assets/user1.svg';
import user3 from 'assets/user3.svg';
import user4 from 'assets/user4.svg';
import editIcon from 'assets/icons/contents/edit_1/dark-color.svg';
import routingIcon from 'assets/icons/location/routing-2/dark-color.svg';
import infoIcon from 'assets/icons/essential/info-circle/dark-color.svg';
import notesIcon from 'assets/icons/contents/note-text/main-color.svg';
import activities from 'assets/user-activities.svg';
import leaderboard from 'assets/leaderboard.svg';
import developmentChart from 'assets/developChart.svg';
import ProfileV1 from 'components/global/profile/v1';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgressBar from 'components/global/progressbar';
import colors from "styles/colors.module.scss"
import Card from './components/card';
import { useLocation, useParams } from 'react-router-dom';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import Modal from 'components/global/modal';
import EditUserModal from './components/editUserModal';
import { useLabActions } from 'pages/supervisor/dashboard/hooks/useLabsActions';
import ProgressTracker from 'components/progressTracker';
import Leaderboard from 'components/leaderboard';
import { useProfileActions } from './hooks/useProfileActions';
import ActivitiesTable from 'components/activitiesTable';
import { useNavigate } from 'react-router-dom';
import { setCurrentMilestone } from 'store/labSlice';
import { setPrevInd } from 'store/labSlice';
import { isEmptyObject } from 'utils/mapper';
import { setUserActivities } from 'store/labSlice';
import moment from 'moment';
import 'moment/locale/fa';
import EditElementsModal from './components/editElementsModal';
import Preloader from 'components/global/preloaders';
import { text } from './constants';
import emptyList from 'assets/icons/contents/empty-path/dark-color.svg'

export default function Profile({editable=false}) {  

    moment.locale('fa');

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const { getMyActivities, getUserActivities } = useProfileActions()

    const userInfo = useSelector(state => state.user.user);
    const labId = useSelector(state => state.lab.labId);
    const path = useSelector(state => state.lab.Paths);
    const milestones = useSelector(state => state.lab.Milestones);
    const leaderboard = useSelector(state => state.lab.leaderboard);
    const activities = useSelector(state => state.lab.userActivities);
    const currentMilestone = useSelector(state => state.lab.CurrentMilestone);


    const [ openEditInfoModal, showEditInfoModal, closeEditInfoModal ] = useModal();
    const [ openEditUserElementsModal, showEditUserElementsModal, closeEditUserElementsModal ] = useModal();
    const [openShowInfoBox, showShowInfoBox, closeShowInfoBox] = useModal();

    const { getLabStudentInfo } = useLabActions();
    const { value: userData, setValue: setUserData } = useInput({});
    const { value: userCurrentMilestones, setValue: setUserCurrentMilestones } = useInput(null);
    const { value: progress, setValue: setProgress } = useInput(0);
    const { value: lastActivities, setValue: setLastActivities } = useInput([]);
    const { value: activitiesOfUser , setValue: setActivitiesOfUser } = useInput([]);
    const { value: elementType, setValue: setElementTypes } = useInput('');
    const { value: myProfileLoading, setValue: setMyProfileLoading } = useInput(true);
    const { value: userProfileLoading, setValue: setUserProfileLoading } = useInput(true);


    const getUserInfo = () => {
        getLabStudentInfo({}, `?lab=${labId}&id=${params.id}`)
            .then(res => {
                setUserData(res.data)
                calcProgress(res.data.path);                
                for (const [i, milestone] of res.data.path[0].Milestones.entries()) {
                    if (milestone.status[0] === null) {
                        setUserCurrentMilestones(milestone);
                        if (i === 0) dispatch(setPrevInd(0))
                        else dispatch(setPrevInd(i-1))
                        break;
                    }
                }
            })
            .catch(err => {
                console.log( err);
            })
    }

    const calcProgress = (path) => {
        let totalCompletedTasks = 0;
        let totalTasks = 0;
        if (path) {
            path[0].Milestones.forEach(milestone => {
                milestone.Tasks.forEach(task => {
                  if (task.status && task.status[0] !== null) totalCompletedTasks++;
                  totalTasks++;
                });
            }); 
        }
        setProgress((totalCompletedTasks/totalTasks)*100)
    }

    const getActivities = (myActivities=true) => {
        if (myActivities) {
            getMyActivities()
                .then(res => {
                    dispatch(setUserActivities(res.data))
                    const lastThree = res.data.slice(-3);
                    setLastActivities(lastThree)
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (!myActivities) {
            getUserActivities({}, `?User=${params.id}`)
                .then(res => {
                    setActivitiesOfUser(res.data)
                    const lastThree = res.data.slice(-3);
                    setLastActivities(lastThree)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    
    const showEditElementsModal = (type) => {
        setElementTypes(type)
        showEditUserElementsModal();
    }

    useEffect(() => {
        if (params.id && labId) {
            getUserInfo();
            getActivities(false)
        }
    }, [params.id, labId])

    useEffect(() => {
        if (!params.id) {
            calcProgress(path)
            setUserData({})
            getActivities(true)
        }
    }, [params.id, labId, userInfo, path])

    useEffect(() => {
        if (editable) setMyProfileLoading(false)
        else setUserProfileLoading(false)
    }, [progress, userData, lastActivities, milestones, currentMilestone, location.pathname, userCurrentMilestones])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['user_data'])}>
                <ProfileV1 
                    profile={editable ? userInfo?.profilePicture : userData?.profilePicture} 
                    loading={editable ? myProfileLoading : userProfileLoading}
                    editable={editable}
                />
                
                <div className={cs(styles['wrapper'], styles['name_wrapper'])}>

                    <div className={cs(styles['name'], (editable ? myProfileLoading : userProfileLoading) && styles['is_loading_name'])}>
                        <p> 
                            {editable ? (!myProfileLoading && userInfo?.firstName) : (!userProfileLoading && userData?.firstName)} 
                            {' '}
                            {editable ? (!myProfileLoading && userInfo?.lastName) : (!userProfileLoading && userData?.lastName)} 
                        </p>
                        {
                            (editable && userInfo && !myProfileLoading) && (
                                <div className={cs(styles['edit_icon_container'])}>
                                    <img 
                                        src={editIcon} 
                                        alt='edit icon' 
                                        className={cs(styles['edit_icon'], editable && styles['edit_mode'])} 
                                        onClick={() => showEditInfoModal()}
                                    />
                                    <Modal
                                        isOpen={openEditInfoModal} 
                                        close={closeEditInfoModal} 
                                        content={
                                            <div className={cs(styles['edit_info_modal'])} style={{display: openEditInfoModal ? 'block' : 'none'}} id='#users_modal'>
                                                <EditUserModal 
                                                    close={closeEditInfoModal} 
                                                />
                                            </div>
                                        }
                                    />
                                </div>
                            )
                        }                        
                        
                    </div>

                    <div className={cs(styles['education_info'])}>
                        {(editable ? !myProfileLoading : !userProfileLoading) ? <p> دانشجوی کارشناسی </p> : <div className={cs(styles['is_loading_type'])}/>}
                        {(editable ? !myProfileLoading : !userProfileLoading) ? <p> {editable ? userInfo?.sid : userData?.sid} </p> : <div className={cs(styles['is_loading_SID'])}/>}
                    </div>
                </div>

                <div className={cs(styles['wrapper'] , styles['development_wrapper'])}>
                    <div className={cs((editable ? !myProfileLoading : !userProfileLoading) ? styles['title'] : styles['is_loading_progress_title'])}>
                        {(editable ? (!myProfileLoading && userInfo) : (!userProfileLoading && userData)) && (
                            <>
                                <p>میزان پیشرفت در راه </p>
                                <img src={routingIcon} alt='route icon'/>
                            </>
                        )}
                    </div>
                    { (editable ? !myProfileLoading : !userProfileLoading) && <LinearProgressBar width={'100%'} height={'10px'} progress={progress} color={colors['main-color-100']}/> }
                    { (editable ? myProfileLoading : userProfileLoading) && <div className={cs(styles['is_loading_progress_bar'])}/> }
                </div>

                <div className={cs(styles['wrapper'] , styles['user_development_wrapper'])}>
                    {(editable ? !myProfileLoading : !userProfileLoading) 
                        ? <div className={cs(styles['title_container'])}> 
                            <p> توسعه دانشجو </p> 
                            <Modal
                                isOpen={openEditUserElementsModal} 
                                close={closeEditUserElementsModal} 
                                content={
                                    <div className={cs(styles['edit_elements_modal'])} style={{display: openEditUserElementsModal ? 'block' : 'none'}} id='#users_elements_modal'>
                                        <EditElementsModal 
                                            close={closeEditUserElementsModal} 
                                            type={elementType}
                                            email={userData.email}
                                            upDateData={getUserInfo}
                                        />
                                    </div>
                                }
                            />
                        </div>
                        
                        : <div className={cs(styles['is_loading_dev_title'])}/>
                    }
                    
                    <div className={cs(styles['cards'])}>
                        {(editable ? !myProfileLoading : !userProfileLoading) 
                            ? (
                                <>
                                    <Card type={'smarties'} value={editable ? userInfo?.smarties : userData?.smarties} onClick={showEditElementsModal}/>
                                    <Card type={'sand'}  value={editable ? userInfo?.sand : userData?.sand} onClick={showEditElementsModal}/>
                                    <Card type={'streak'}  value={editable ? userInfo?.streak : userData?.streak} onClick={showEditElementsModal}/>
                                </>
                            ) : (
                                <>
                                    <div className={cs(styles['is_loading_card'])}/>
                                    <div className={cs(styles['is_loading_card'])}/>
                                    <div className={cs(styles['is_loading_card'])}/>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className={cs(styles['wrapper'] , styles['last_activity_wrapper'])}>
                    <div className={cs(styles['right_column'])}>
                        {(editable ? !myProfileLoading : !userProfileLoading) 
                            ? <p className={cs(styles['title'])}> آخرین فعالیت‌ها </p>
                            : <div className={cs(styles['is_loading_activity_title'])}/>
                        }
                        
                        {/* {((userInfo && lastActivities) || userData) ? <p> {lastActivities[0]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {((userInfo && lastActivities) || userData) ?<p> {lastActivities[1]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {((userInfo && lastActivities) || userData) ?<p> {lastActivities[2]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }   */}
                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ?<p> {lastActivities[0]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ?<p> {lastActivities[1]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ?<p> {lastActivities[2]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }  
                    </div>

                    <div className={cs(styles['left_column'])}>
                        {(editable ? !myProfileLoading : !userProfileLoading)  ? <p> تاریخ </p> : <div className={cs(styles['is_loading_activity_title'])}/> }
                        {/* {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[0]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[1]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[2]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> } */}

                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ? <p> {moment(lastActivities[0]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ? <p> {moment(lastActivities[1]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(editable ? (!myProfileLoading && lastActivities) : (!userProfileLoading && userData)) ? <p> {moment(lastActivities[2]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                    </div>
                </div>

                {
                    editable && (
                        <div className={cs(styles['wrapper'] , styles['notes_wrapper'])} >
                            {(!myProfileLoading) 
                                ? <p className={cs(styles['title'])}>  یادداشت ها</p>
                                : <div className={cs(styles['is_loading_notes_title'])}/>
                            }
                            {
                                (!myProfileLoading) 
                                    ? <img src={notesIcon} alt='notes icon' onClick={() => navigate('../notes')}/>
                                    : <div className={cs(styles['is_loading_notes_icon'])}/>
                            }
                          
                        </div>
                    )
                }

            </div>

            <div className={cs(styles['user_activities'])}>
                {(editable ? !myProfileLoading : !userProfileLoading) ? <p className={cs(styles['title'])}> فعالیت دانشجو</p> : <div className={cs(styles['is_loading_title'])}/>}
                {/* {
                    editable 
                        ? (!myProfileLoading) ? <ActivitiesTable activities={activities}/> : <Preloader />
                        : (!userProfileLoading) ?  <ActivitiesTable activities={activitiesOfUser}/> : <Preloader />
                } */}
               
            </div>

            <div className={cs(styles['user_path'])}>
                {
                    !editable   
                        ? (
                            userProfileLoading
                                ? (
                                    <>
                                        <div className={cs(styles['is_loading_notes_title'])} />
                                        <Preloader />
                                    </>
                                ) : (
                                    !isEmptyObject(userData) && userCurrentMilestones  
                                        ? (
                                            <>
                                                <p className={cs(styles['title'])}> {`نقشه راه  - ${userData ? userData?.path[0]?.name : '-'}`} </p>
                                                <ProgressTracker 
                                                    milestones={userData?.path[0]?.Milestones}
                                                    currentMilestone={userCurrentMilestones}
                                                /> 
                                            </>
                                        ) : (
                                            <div className={cs(styles['empty_path'])}> 
                                                <img src={emptyList} alt='no paths exists'/>
                                                <p> {text.empty_paths} </p>
                                            </div>
                                        )
                                )
                        ) : (

                            myProfileLoading 
                                ? (
                                    <>
                                        <div className={cs(styles['is_loading_notes_title'])} />
                                        <Preloader />
                                    </>
                                ) : (
                                    milestones && currentMilestone ? (
                                        <> 
                                            <p className={cs(styles['title'])}> {`نقشه راه  - ${path && path[0]?.name ? path[0]?.name : '-'}`} </p>
                                            <ProgressTracker 
                                                milestones={milestones}
                                                currentMilestone={currentMilestone}
                                            /> 
                                        </>
                                    ) : (
                                        <div className={cs(styles['empty_path'])}> 
                                            <img src={emptyList} alt='no paths exists'/>
                                            <p> {text.empty_paths} </p>
                                        </div>
                                    )
                                )
                        )
                }

            </div>

            <div  className={cs(styles['righ_col'])}>
                <div className={cs(styles['leaderboard'])}>
                    <div className={cs(styles['title'])}>
                        {
                            (editable ? !myProfileLoading : !userProfileLoading) ? 
                                <>
                                    <p> لیدربورد </p>
                                    <div className={cs(styles['info_icon_container'])}>
                                        <img src={infoIcon} alt='info icon' onClick={() => showShowInfoBox()}/>
                                        <Modal
                                            isOpen={openShowInfoBox} 
                                            close={closeShowInfoBox} 
                                            content={
                                                <div 
                                                    id='#info_box'
                                                    style={{display: openShowInfoBox ? 'block' : 'none'}} 
                                                    className={cs(styles['info_box'])} 
                                                >
                                                    <div className={cs(styles['info_text_container'])}>
                                                        <p> {text.info_title} </p>
                                                        <p> {text.info_desc} </p>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </div>
                                </>
                             : <div className={cs(styles['is_loading_leaderboard_title'])}/>
                        }
                    </div>
                    {
                        (editable ? !myProfileLoading : !userProfileLoading) ? <Leaderboard list={leaderboard}/> : <Preloader />
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}

