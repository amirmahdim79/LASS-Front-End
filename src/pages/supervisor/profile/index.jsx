import {default as cs} from 'classnames'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import styles from './style.module.scss'
import editIcon from 'assets/icons/contents/edit_1/dark-color.svg';
import notesIcon from 'assets/icons/contents/note-text/main-color.svg';
import Modal from 'components/global/modal';
import ProfileV1 from 'components/global/profile/v1'
import useInput from 'hooks/useInputHandler';
import moment from 'moment';
import 'moment/locale/fa';
import ActivitiesTable from 'components/activitiesTable';
import Preloader from 'components/global/preloaders';
import { text } from './constants';
import { useProfileActions } from './hooks/useProfileActions';
import { setUserActivities } from 'store/labSlice';


export default function SupsProfile() {  

    moment.locale('fa');
    const dispatch = useDispatch();

    const { getMyActivities, getUserActivities } = useProfileActions()

    const navigate = useNavigate();
    const userInfo = useSelector(state => state.user.user);
    const activities = useSelector(state => state.lab.userActivities);
    const labName = useSelector(state => state.lab.labName);
    const labDesc = useSelector(state => state.lab.labDesc);

    const { value: myProfileLoading, setValue: setMyProfileLoading } = useInput(true);
    const { value: lastActivities, setValue: setLastActivities } = useInput([]);

    const [ openEditInfoModal, showEditInfoModal, closeEditInfoModal ] = useModal();

    const getActivities = () => {
        getMyActivities()
            .then(res => {
                dispatch(setUserActivities(res.data))
                const lastThree = res.data.slice(-3);
                setLastActivities(lastThree)
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        setMyProfileLoading(false)
        getActivities(true)
    }, [userInfo])

    console.log("activities", activities);


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['user_data'])}>
                <ProfileV1
                    profile={userInfo?.profilePicture} 
                    loading={myProfileLoading}
                    editable={true}
                    height={'100%'}
                    userType={'sups'}
                />
                <div className={cs(styles['wrapper'], styles['name_wrapper'])}>
                    <div className={cs(styles['name'], myProfileLoading && styles['is_loading_name'])}>
                        <p> 
                            {!myProfileLoading && userInfo?.firstName} 
                            {' '}
                            {!myProfileLoading && userInfo?.lastName} 
                        </p>
                        {
                            (userInfo && !myProfileLoading) && (
                                <div className={cs(styles['edit_icon_container'])}>
                                    <img 
                                        src={editIcon} 
                                        alt='edit icon' 
                                        className={cs(styles['edit_icon', 'edit_mode'])} 
                                        onClick={() => showEditInfoModal()}
                                    />
                                    <Modal
                                        isOpen={openEditInfoModal} 
                                        close={closeEditInfoModal} 
                                        content={
                                            <div className={cs(styles['edit_info_modal'])} style={{display: openEditInfoModal ? 'block' : 'none'}} id='#users_modal'>
                                                {/* <EditUserModal 
                                                    close={closeEditInfoModal} 
                                                /> */}
                                            </div>
                                        }
                                    />
                                </div>
                            )
                        }    
                        <div className={cs(styles['role'])}>
                            <p> {text.role} </p>    
                        </div>                    
                    </div>

                    <div className={cs(styles['wrapper'] , styles['last_activity_wrapper'])}>
                        <div className={cs(styles['right_column'])}>
                            {!myProfileLoading 
                                ? <p className={cs(styles['title'])}> آخرین فعالیت‌ها </p>
                                : <div className={cs(styles['is_loading_activity_title'])}/>
                            }
                            
                            {/* {((userInfo && lastActivities) || userData) ? <p> {lastActivities[0]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {((userInfo && lastActivities) || userData) ?<p> {lastActivities[1]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {((userInfo && lastActivities) || userData) ?<p> {lastActivities[2]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }   */}
                            {!myProfileLoading && lastActivities ?<p> {lastActivities[0]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {!myProfileLoading && lastActivities ?<p> {lastActivities[1]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {!myProfileLoading && lastActivities ?<p> {lastActivities[2]?.text} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }  
                        </div>

                        <div className={cs(styles['left_column'])}>
                            {!myProfileLoading ? <p> تاریخ </p> : <div className={cs(styles['is_loading_activity_title'])}/> }
                            {/* {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[0]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[1]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {((userInfo && lastActivities) || userData) ? <p> {moment(lastActivities[2]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> } */}

                            {!myProfileLoading && lastActivities.length ? <p> {moment(lastActivities[0]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {!myProfileLoading && lastActivities.length ? <p> {moment(lastActivities[1]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                            {!myProfileLoading && lastActivities.length ? <p> {moment(lastActivities[2]?.createdAt)._d.toLocaleDateString('fa-IR')} </p> : <div className={cs(styles['is_loading_activity_subtitle'])}/> }
                        </div>
                    </div>

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
                </div>
            </div>

            <div className={cs(styles['user_activities'])}>
                {!myProfileLoading ? <p className={cs(styles['title'])}> فعالیت استاد</p> : <div className={cs(styles['is_loading_title'])}/>}
                {/* {(!myProfileLoading) ? <ActivitiesTable activities={activities}/> : <Preloader /> } */}
            </div>

            <div className={cs(styles['lab_info'])}>
                <div className={cs(styles['lab_name'])}>
                   <p> {labName} </p>
                   {
                        (userInfo && !myProfileLoading) && (
                            <div className={cs(styles['edit_icon_container'])}>
                                <img 
                                    src={editIcon} 
                                    alt='edit icon' 
                                    className={cs(styles['edit_icon', 'edit_mode'])} 
                                    onClick={() => showEditInfoModal()}
                                />
                                <Modal
                                    isOpen={openEditInfoModal} 
                                    close={closeEditInfoModal} 
                                    content={
                                        <div className={cs(styles['edit_info_modal'])} style={{display: openEditInfoModal ? 'block' : 'none'}} id='#users_modal'>
                                            {/* <EditUserModal 
                                                close={closeEditInfoModal} 
                                            /> */}
                                        </div>
                                    }
                                />
                            </div>
                        )
                    }    
                </div>
                <div className={cs(styles['lab_desc'])}>
                    <p>
                        {labDesc}
                    </p>

                </div>
            </div>
        </div>
    )
}