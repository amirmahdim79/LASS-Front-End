import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersListG'
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

export default function Settings() { 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        getLabGroups, 
        updateLabGroup, 
        updatingLabGroup,
        updatePermissions,
        updatingPermissions,
        getPermissions,
    } = useSettingsActions();
    
    const { getMyLabs } = useLabActions();


    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);
    const permissions = useSelector(state => state.user.permissions);

    const [openEditPermissionsModal, showEditPermissionsModal, closeEditPermissionsModal] = useModal();

    const { value: selectedStudent, setValue: setSelectedStudent } = useInput({});
    const { value: permissionsList, setValue: setPermissionsList } = useInput([]);

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

    useEffect(() => {
        getLabGroups({}, `/${labId}`)
            .then(res => dispatch(setLabGroups(res.data)))
            .catch(err => console.log(err))
            .finally(() => dispatch(setNewName(undefined)))

        getPermissions({}, `?withDesc=true`)
            .then(res => setPermissionsList(res.data.array))
            .catch(err => console.log(err))
    }, [])



    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['goups_container'])}>
                    <Groups />
                </div>
                <div className={cs(styles['path_container'])}>
                    <div className={cs(styles['header'])}>
                        <p> مسیر‌راه‌ها </p>
                        { (userType === 'supervisor' || (userType === 'user' && permissions.include('lab'))) && 
                            <img 
                                src={addIcon}
                                alt='add icon'
                                onClick={() => navigate('../create-path')}
                            />
                        }
                    </div>

                    <Carousel 
                        name = 'path-ways'    
                    />
                </div>
                <div className={cs(styles['calendar_container'])}>
                    {/* <Carousel 
                        name = 'path-ways2'    
                    /> */}
                </div>
            </div>
            <UsersList 
                canDeleteMember={true}
                canEditPermissions={userType === 'supervisor'}
                onClickEditPermissions={onClickEditPermissions}
                students={students}
                userHasClickOption={true}
                height={'770px'}
                userOnClickHandler={(uId) => navigate(`../user_profile/${uId}`)}
            />

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
