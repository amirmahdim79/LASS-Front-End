import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import delIcon from 'assets/icons/essential/trash/error-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersListG'
import { useNavigate, useParams } from 'react-router-dom';
import Groups from 'components/groupsList'
import colors from "styles/colors.module.scss"
import avatar from 'assets/images/avatar.png'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import SearchBar from 'components/global/searchbar'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import CheckBoxV1 from 'components/global/checkbox/v1'
import CheckBoxV2 from 'components/global/checkbox/v2'
import { useModal } from 'hooks/useModal'
import Modal from 'components/global/modal'
import DeleteModal from './components/deleteModal'
import { useSettingsActions } from '../hooks/useSettingsActions'
import { setNewName } from 'store/labSlice'
import useToast from 'hooks/useToast'
import { degreeMapper } from 'utils/mapper'
import { getFirstLetters } from 'utils/mapper'


export default function GroupSettings() { 

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [openDeleteModal, showDeleteModal, closeDeleteModal] = useModal();
    const { 
        deleteLabGroup, deletingLabGroup, 
        updateLabGroup, updatingLabGroup 
    } = useSettingsActions();


    const students = useSelector(state => state.lab.Students);
    const labGroups = useSelector(state => state.lab.labGroups);
    const groupName = useSelector(state => state.lab.labGroupNewName);


    const { value: deleteType, setValue: setDeleteType } = useInput('');
    const { value: groupData, setValue: setGroupData } = useInput({});
    const { value: checkk, setValue: setCheckk } = useInput(false);
    const { value: userId, setValue: setUserId } = useInput(undefined);
    const { value: usersId, setValue: setUsersId } = useInput([]);
    const { value: selectAllUsers, setValue: setSelectAllUsers } = useInput(false);

    // console.log("---groupData---", groupData);
    // 653bc740f2cf6ab7787279e1
    // 65322b1e95e0d4f18a0563cf

    const onClickDeleteMember = (id) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        showDeleteModal();
        setUserId(id);
        setDeleteType('user')
    }
    
    const submitDelete = () => {
        if (deleteType === 'group') {
            deleteLabGroup({Group: params.id})
                .then(() =>navigate('../settings'))
                .catch(err => console.log(err))
                .finally(() => {
                    closeDeleteModal();
                })
        }else {
            updateLabGroup({ Group: params.id, remove: userId})
                .then((res) => {
                    setGroupData(res.data);
                    showToast('کاربر با موفقیت از گروه حذف شد', 'success');
                })
                .catch(() => showToast('مشکلی پیش اومده', 'error'))
                .finally(() => {
                    closeDeleteModal();
                })
        }  
    }

    const addUser = (id) => {
        let usersList = [...usersId];
        const index = usersList.indexOf(id);

        if (index > -1) usersList.splice(index, 1);
        else usersList.push(id);
        setUsersId(usersList);

        if (usersId.length !== 0 && usersId.length !== students.length) {
            setSelectAllUsers(false)
        }
    }

    const addAllUsers = (selectAll) => {
        setSelectAllUsers(selectAll);
        if (selectAll) {
            let result = students.map(s => s._id);
            setUsersId(result);
        } else setUsersId([]);
    }

    useEffect(() => {
        if(labGroups.length) {
            let data = labGroups.find(x => x._id === params.id);
            setGroupData(data);
            dispatch(setNewName(data.name))
            setUsersId(data.Users.map(u => u._id));
        }
    }, [labGroups])

    useEffect(() => {
        dispatch(setNewName(undefined))
    }, [])

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['header'])}>
                    <h1> {text.title} </h1>
                    <img 
                        src={delIcon}
                        alt='trash icon'
                        onClick={() => {showDeleteModal(); setDeleteType('group')}}
                    />
                </div>
                <div className={cs(styles['data_container'])}>
                    <TextInputV2 
                        fontFamily={'pinar_reg'}
                        onChange={(e) => dispatch(setNewName(e.target.value))}
                        placeholder={groupData?.name}
                        value={groupName ?? groupName}
                        width={'255px'}
                        dir={'rtl'}
                    />

                    <div className={cs(styles['users_container'])}>
                        <div className={cs(styles['header'])}>
                            <div className={cs(styles['top'])}>
                                <h2> {text.users_title} </h2>
                                <div className={cs(styles['tools'])}>
                                    <div> 
                                        <SearchBar 
                                            height={'40px'} 
                                            borderRadius={'12px'} 
                                            placeholder={'نام فایل را جست و جو کنید'} 
                                            fontSize={'14px'}
                                            // value={searchKeyword}
                                            // setValue={setSearchKeyword}
                                        /> 
                                    </div>
                                    <div className={cs(styles['filter_icon'])}> 
                                        <img 
                                            src={filterIcon}
                                            alt='filter icon'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cs(styles['table_body'])}>
                            <div className={cs(styles['col_1'])}>
                                <CheckBoxV2 
                                    value={selectAllUsers} 
                                    onClick={() => addAllUsers(!selectAllUsers)}
                                    bgColor={colors['light-accent-20']}
                                />
                                <p> {text.header_1} </p>
                            </div>
                            <div className={cs(styles['col_2'])}>
                                <p> {text.header_2} </p>
                            </div>
                            <div className={cs(styles['data'])}>
                                {students && students.map((student, i) => 
                                    <div key={i} className={cs(styles['row'])} >
                                        <div className={cs(styles['name_wrapper'])}>
                                            <CheckBoxV2 
                                                value={usersId.includes(student._id)}
                                                onClick={() => addUser(student._id)}
                                                bgColor={colors['light-accent-20']}
                                            />
                                            <div 
                                                style={student?.profilePicture && {backgroundImage: `url(${student?.profilePicture})`}} 
                                                className={cs(styles['avatar'], !student?.profilePicture && styles['empty_avatar'])}
                                            >
                                                {!student?.profilePicture &&
                                                    <p>{getFirstLetters(`${student?.firstName} ${student?.lastName}`)}</p>
                                                }
                                            </div>
                                            <p> {student?.firstName} {student?.lastName}</p>
                                        </div>
                                        <div className={cs(styles['grade_wrapper'])}>
                                            <p> {degreeMapper(student?.type)} </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UsersList 
                title={'اعضای فعلی'}
                btnText={'ذخیره تغییرات گروه'}
                btnColor={colors['dark-shades-100']}
                students={students && students.filter(s => usersId.includes(s._id)).map(s => s)}
                canDeleteMember={true}
                hasSubmitBtn={true}
                btnDisabled={false}
                btnLoad={updatingLabGroup}
                submitHandler={updateLabGroup}
                deleteOnClickHandler={onClickDeleteMember}
                userHasClickOption={true}
                userOnClickHandler={(uId) => navigate(`../user_profile/${uId}`)}
                newList={usersId}
            />

            <Modal
                isOpen={openDeleteModal} 
                close={closeDeleteModal} 
                content={
                    <div className={cs(styles['delete_modal'])} style={{display: openDeleteModal ? 'block' : 'none'}} >
                        <DeleteModal
                            onCancel={closeDeleteModal}
                            onSubmit={submitDelete}
                            submitLoad={deleteType === 'group' ? deletingLabGroup : updatingLabGroup}
                            title={deleteType === 'group' ? 'آیا از حذف گروه مطمئینید؟' : 'آیا از حذف کاربر مطمئنید؟'}
                        />
                    </div>
                }
            />
        </div>
    )
}
