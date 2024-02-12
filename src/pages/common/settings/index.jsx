import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersList/simpleVersion'
import { useNavigate } from 'react-router-dom';
import Groups from 'components/groupsList'
import { useSettingsActions } from './hooks/useSettingsActions'
import { setLabGroups } from 'store/labSlice'
import Carousel from 'components/global/carousel'
import { setNewName } from 'store/labSlice'
import Modal from 'components/global/modal'
import { useModal } from 'hooks/useModal'
import PermissionsModal from './modals/permissions'
import { useLabActions } from 'pages/supervisor/dashboard/hooks/useLabsActions'
import { setStudents } from 'store/labSlice'
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import Calendar from 'components/calendar'
import { setEvents } from 'store/labSlice'
import moment from 'moment';
import 'moment/locale/fa';

export default function Settings() { 

    moment.locale('fa');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        getLabGroups, 
        updateLabGroup, 
        updatingLabGroup,
        updatePermissions,
        updatingPermissions,
        getPermissions,
        getLabData
    } = useSettingsActions();
    
    const { getMyLabs, getLabEvents } = useLabActions();


    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);
    const userInfo = useSelector(state => state.user.user);
    const paths = useSelector(state => state.lab.Paths);

    const [openEditPermissionsModal, showEditPermissionsModal, closeEditPermissionsModal] = useModal();

    const { value: selectedStudent, setValue: setSelectedStudent } = useInput({});
    const { value: permissionsList, setValue: setPermissionsList } = useInput([]);
    const { value: now, setValue: setNow } = useInput(moment());

    const userType = localStorage.getItem('type');

    const onClickUser = (userId) => {
        navigate(`../user_profile/${userId}`)
    }

    const onClickEditPermissions = (student) => {
        setSelectedStudent(student)
        showEditPermissionsModal()
    }

    const onSubmitPermissions = (list) => {
        let permissions = {}
        permissionsList.forEach(p => { permissions[p.value] = list[p.value]} );

        let data = {
            email: selectedStudent?.email,
            permissions: permissions,
        }

        updatePermissions({...data})
            .then(() => {
                closeEditPermissionsModal()
                getMyLabs({}, '?sups=true')
                    .then(res => {
                        let data = res.data?.Students.find(r => r._id === selectedStudent._id)
                        setSelectedStudent(data)
                        dispatch(setStudents(res.data.Students))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const getEvents= (labId) => {
        getLabEvents({'date': `${now.month()+1}/${now.date()}/${now.year()}`}, `/${labId}`)
            .then(res => {
                dispatch(setEvents(res.data))})
            .catch(err => console.log(err))
    }



    useEffect(() => {
        if (labId) {
            getLabGroups({}, `/${labId}`)
                .then(res => dispatch(setLabGroups(res.data)))
                .catch(err => console.log(err))
                .finally(() => dispatch(setNewName(undefined)))
        }

        getPermissions({}, `?withDesc=true`)
            .then(res => setPermissionsList(res.data.array))
            .catch(err => console.log(err))

        // if (userType === 'user' && userInfo) {
        //     getLabData({}, `/${userInfo.Labs[0]}`)
        //         .then(res => setLabPaths(res.data))
        //         .catch(err => console.log('ererer', err))
        // }
    }, [])

    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['goups_container'])}>
                    <Groups />
                </div>
                <div className={cs(styles['path_container'])}>
                    <div className={cs(styles['header'])}>
                        <p> نقشه راه ها </p>
                        { userType === 'supervisor' && 
                            <img 
                                src={addIcon}
                                alt='add icon'
                                onClick={() => navigate('../create-path')}
                            />
                        }
                    </div>

                    {
                        paths 
                            ?
                                <Carousel 
                                    name='path-ways'   
                                    type='path'
                                    items={paths}
                                />
                            : <p>loading</p>
                    }

                    
                </div>
                <div className={cs(styles['calendar_container'])}>
                    {/* <Calendar events={[]} date={now} setDate={setNow} getEvents={getEvents}/> */}
                </div>
            </div>
            <div className={cs(styles['users_list'])}>
                <UsersList 
                    canDeleteMember={true}
                    canEditPermissions={userType === 'supervisor'}
                    onClickEditPermissions={onClickEditPermissions}
                    students={students && students}
                    userHasClickOption={true}
                    height={'calc(380px + 380px + 10px)'}
                    width={'100%'}
                    userOnClickHandler={(uId) => navigate(`../user_profile/${uId}`)}
                />
            </div>


            <Modal
                isOpen={openEditPermissionsModal} 
                close={closeEditPermissionsModal} 
                content={
                    <div 
                        id='#permissions_modal'
                        className={cs(styles['permissions_modal'])} 
                        style={{display: openEditPermissionsModal ? 'block' : 'none'}} 
                    >
                        <PermissionsModal 
                            submit={onSubmitPermissions} 
                            isOpen={openEditPermissionsModal}
                            data={selectedStudent} 
                            permissions={permissionsList}
                            userPermissions={selectedStudent.permissions}
                            load={updatingPermissions}
                        />
                    </div>
                }
            />


        </div>
    )
}
