import {default as cs} from 'classnames'
import styles from './profile.module.scss'
import avatar from 'assets/avatar.svg';
import user1 from 'assets/user1.svg';
import user3 from 'assets/user3.svg';
import user4 from 'assets/user4.svg';
import editIcon from 'assets/icons/contents/edit_1/dark-color.svg';
import routingIcon from 'assets/icons/location/routing-2/dark-color.svg';
import infoIcon from 'assets/icons/essential/info-circle/dark-color.svg';
import activities from 'assets/user-activities.svg';
import leaderboard from 'assets/leaderboard.svg';
import developmentChart from 'assets/developChart.svg';
import ProfileV1 from 'components/global/profile/v1';
import { useSelector } from 'react-redux';
import LinearProgressBar from 'components/global/progressbar';
import colors from "styles/colors.module.scss"
import Card from './components/card';
import { useParams } from 'react-router-dom';
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


export default function Profile({editable=false}) {  

    const params = useParams();
    const userInfo = useSelector(state => state.user.user);
    const labId = useSelector(state => state.lab.labId);
    const path = useSelector(state => state.lab.Paths);
    const milestones = useSelector(state => state.lab.Milestones);
    const leaderboard = useSelector(state => state.lab.leaderboard);


    const [ openEditInfoModal, showEditInfoModal, closeEditInfoModal ] = useModal();
    const { getLabStudentInfo } = useLabActions();
    const { value: userData, setValue: setUserData } = useInput({});

    const getUserInfo = () => {
        if (labId) {
            getLabStudentInfo({}, `?lab=${labId}&id=${params.id}`)
                .then(res => {
                    console.log("----res.data", res.data);
                    setUserData(res.data)
                })
                .catch(err => {
                    console.log( err);
                })
        }
    }

    
    useEffect(() => {
        if (labId) {
            // if (!editable) {
            //     getUserInfo();
            // }
            if (params.id) {
                getUserInfo();
            }
        }
    }, [params.id])


    useEffect(() => {
        console.log("22222222222222222222222222222");
    }, [])



    // useEffect(() => {
    //     if (labId) {
    //         // if (!editable) {
    //         //     getUserInfo();
    //         // }
    //         if (params.id) {
    //             getUserInfo();
    //         }
    //         getLeaderboardData()
    //     }
    // }, [labId, params.id])

    // console.log("labId", labId);
    // console.log("userData", userData);
    // console.log("params.id", params.id);


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['user_data'])}>
                <ProfileV1 
                    profile={editable ? userInfo?.profilePicture : userData?.profilePicture} 
                    loading={(editable ? userInfo : userData) ? false : true}
                    editable={editable}
                />
                
                <div className={cs(styles['wrapper'], styles['name_wrapper'])}>

                    <div className={cs(styles['name'], (editable ? !userInfo : !userData) && styles['is_loading_name'])}>
                        <p> {editable ? userInfo?.firstName : userData?.firstName} {editable ? userInfo?.lastName : userData?.lastName} </p>
                        {
                            (editable && userInfo) && (
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
                        {userInfo || userData ? <p> دانشجوی کارشناسی </p> : <div className={cs(styles['is_loading_type'])}/>}
                        {userInfo || userData ? <p> {editable ? userInfo?.sid : userData?.sid} </p> : <div className={cs(styles['is_loading_SID'])}/>}
                    </div>
                </div>

                <div className={cs(styles['wrapper'] , styles['development_wrapper'])}>
                    <div className={cs((userInfo || userData) ? styles['title'] : styles['is_loading_progress_title'])}>
                        {(userInfo || userData) && (
                            <>
                                <p>میزان پیشرفت در راه </p>
                                <img src={routingIcon} alt='route icon'/>
                            </>
                        )}
                    </div>
                    { (userInfo || userData) && <LinearProgressBar width={'100%'} height={'10px'} progress={40} color={colors['main-color-100']}/> }
                    { !(userInfo || userData) && <div className={cs(styles['is_loading_progress_bar'])}/> }
                </div>

                <div className={cs(styles['wrapper'] , styles['user_development_wrapper'])}>
                    {(userInfo || userData) ? <p> توسعه دانشجو </p> : <div className={cs(styles['is_loading_dev_title'])}/>}
                    
                    <div className={cs(styles['cards'])}>
                        {(userInfo || userData) 
                            ? (
                                <>
                                    <Card type={'smarties'} value={editable ? userInfo?.smarties : userData?.smarties}/>
                                    <Card type={'sand'}  value={editable ? userInfo?.sand : userData?.sand}/>
                                    <Card type={'streak'}  value={editable ? userInfo?.streak : userData?.streak}/>
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
                        {(userInfo || userData) 
                            ? <p className={cs(styles['title'])}> آخرین فعالیت‌ها </p>
                            : <div className={cs(styles['is_loading_activity_title'])}/>
                        }
                        {(userInfo || userData) ? <p> تحویل نمونه اولیه </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(userInfo || userData) ? <p> تحویل گزارش کار </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(userInfo || userData) ? <p> مطالعه مقاله </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }  
                    </div>

                    <div className={cs(styles['left_column'])}>
                        {(userInfo || userData) ? <p> تاریخ </p> : <div className={cs(styles['is_loading_activity_title'])}/> }
                        {(userInfo || userData) ? <p> 1402/08/29 </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(userInfo || userData) ? <p> 1402/08/29 </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        {(userInfo || userData) ? <p> 1402/08/29 </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                    </div>
                </div>
            </div>

            <div className={cs(styles['user_activities'])}>
                <p className={cs(styles['title'])}> فعالیت دانشجو </p>
                <ActivitiesTable />
            </div>
            <div className={cs(styles['user_path'])}>
                {
                    (userInfo || userData) 
                        ? 
                            <>
                                <p className={cs(styles['title'])}> {`مسیر راه  - ${editable ? path?.name : userData?.path?.name}`} </p>
                                <ProgressTracker milestones={editable ? milestones : userData?.path?.Milestones}/> 
                            </>
                        : <div/>

                }

            </div>

            <div  className={cs(styles['righ_col'])}>
                <div className={cs(styles['leaderboard'])}>
                    <div className={cs(styles['title'])}>
                        {
                            userInfo ? 
                                <>
                                    <p> لیدربورد </p>
                                    <img src={infoIcon} alt='info icon'/>
                                </>
                             : <div className={cs(styles['is_loading_leaderboard_title'])}/>
                        }
                        
                    </div>
                   
                    {/* <img src={leaderboard} alt='leaderboard chart'/>
                    <div className={cs(styles['top_users'])}>
                        {
                            topUsers.map((user, i) => 
                                <div className={cs(styles['user'])} key={i}>
                                    <p> {i+1}. </p>
                                    <img src={user.avatar} alt='avatar' />
                                    <p> {user.name} </p>
                                </div>
                            )
                        }
                        
                    </div> */}
                    <Leaderboard list={leaderboard}/>
                </div>
                <div className={cs(styles['development_chart'])}>
                    <p> نمودار توسعه </p>
                    <img src={developmentChart} alt='developmentChart'/>
                </div>
            </div>
        </div>
    )
}

