import { default as cs } from 'classnames'
// import { text } from './constants'
import styles from './style.module.scss'
import functions from "../../styles/mixins/_functions.module.scss"


import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import avatar from 'assets/images/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from 'hooks/useModal'
import AddUserModal from 'pages/supervisor/dashboard/modals/addUserModal'
import Preloader from 'components/global/preloaders'
import Modal from 'components/global/modal'

import addIcon from 'assets/icons/essential/add/dark-color.svg'
import delIcon from 'assets/icons/essential/trash/dark-color.svg'
import delRedIcon from 'assets/icons/essential/trash/error-color.svg'
import editIcon from 'assets/icons/contents/edit_2/dark-color.svg'
import Button from 'components/global/button'
import useInput from 'hooks/useInputHandler'
import useToast from 'hooks/useToast'
import { getFirstLetters } from 'utils/mapper'
import { setNewName } from 'store/labSlice'
import { degreeMapper } from 'utils/mapper'


export default function UsersList({
    type = 'editGroup',
    bgColor = '',
    width = '340px',
    height = '705px',
    titleListGap = '25px',
    borderRadius = '15px',
    padding = '18px 20px',

    listItemSpacing = '20px',
        
    title = 'لیست دانشجویان',
    titleFontSize = '20px',
    titleStyle = {},

    hasSubmitBtn = false,
    btnColor = '',
    btnText = '',
    btnBottomPos = '18px',
    btnWidth = '255px',
    btnDisabled = true,
    btnLoad = false, 
    submitHandler = () => {},
    onClickBtn,

    students=[],
    userHasClickOption = false,
    userOnClickHandler = () => {},
    userDataMaxWidth='135px',
        
    addMemberModalWidth = '340px',
    addMemberModalHeight = '265px',
    addMemberModalRadius = '12px',
    canAddMember = false,
    canFilterMembers = true,
    canSortMembers = true,
    canDeleteMember = false,
    deleteOnClickHandler = () => {},

    canEditPermissions = false,
    onClickEditPermissions = () => {},

    hasMoreInfo = false,
    moreInfo = '',
    newList = [],
}) {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userType = localStorage.getItem('type');

    const { showToast } = useToast();
    const groupName = useSelector(state => state.lab.labGroupNewName);
    const permissions = useSelector(state => state.user.permissions);

    const [openAddMemberModal, showAddMemberModal, closeAddMemberModal] = useModal();
    
    const { value: imageHoverStates, setValue: setImageHoverStates } = useInput(students ? Array(students.length).fill(false) : []);

    const handleMouseEnter = (index) => {
        const newHoverStates = [...imageHoverStates];
        newHoverStates[index] = true;
        setImageHoverStates(newHoverStates);
    };
    
    const handleMouseLeave = (index) => {
        const newHoverStates = [...imageHoverStates];
        newHoverStates[index] = false;
        setImageHoverStates(newHoverStates);
    };

    const submitChanges = () => {
        if (type === 'editGroup') {
            if (groupName && groupName.trim().length) {
                submitHandler({ Group: params.id, name: groupName, final: newList})
                    .then((res) => {
                        console.log("----------------------------", res.data);
                        showToast('نام گروه با موفقیت ویرایش شد', 'success');
                        navigate('../settings');
                    })
                    .catch(() => showToast('مشکلی پیش اومده', 'error'))
            } else {
                dispatch(setNewName(''))
                showToast('نام گروه نمی تواند خالی باشد', 'error');
            }
        } else {
            onClickBtn();
        }
        
    }

    return (
        
        <div 
            className={cs(styles['container'])} 
            style={{
                minWidth: width, maxWidth: width, minHeight: height,
                backgroundColor: bgColor,
                rowGap: titleListGap,
                borderRadius: borderRadius,
                padding: padding
            }}
        >
            <div className={cs(styles['header'])} style={titleStyle}> 
                <div className={cs(styles['column'])}>
                    <h2 style={{fontSize: titleFontSize}}> {title} </h2> 
                    { canAddMember && (
                        <div className={cs(styles['add_icon_container'])}>
                            <img 
                                src={addIcon}
                                alt='add icon'
                                onClick={() => showAddMemberModal()}
                                className={cs(styles['icon'])}
                            />
                            <Modal 
                                isOpen={openAddMemberModal} 
                                close={closeAddMemberModal} 
                                content={
                                    <div 
                                        id='#users_modal'
                                        className={cs(styles['add_user_modal'])} 
                                        style={{
                                            display: openAddMemberModal ? 'block' : 'none', 
                                            borderRadius: addMemberModalRadius,
                                            width: addMemberModalWidth, 
                                            height: addMemberModalHeight
                                        }} 
                                    >
                                        <AddUserModal close={closeAddMemberModal}/>
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
                {(canFilterMembers || canSortMembers) && (
                    <div className={cs(styles['column'])}>
                        {canFilterMembers && (
                            <img 
                                src={filterIcon}
                                alt='filter icon'
                                className={cs(styles['icon'])}
                            />
                        )}
                        {canSortMembers && (
                            <img 
                                src={sortIcon}
                                alt='sort icon'
                                className={cs(styles['icon'])}
                            />
                        )}
                    </div>
                )}
            </div>

            <div className={cs(styles['users_list'])} style={{rowGap: listItemSpacing}}>
                {
                    !students 
                        ? <div className={cs(styles['loader_container'])}> <Preloader/> </div>
                        : (students && students.map((s, i) => 
                                <div 
                                    className={cs(styles['user_data_container'])}
                                    style={{
                                        alignItems: !hasMoreInfo ? 'center' : 'flex-start',
                                        ...((userHasClickOption && ((userType === 'user' && permissions && permissions.indexOf('lab') > -1) || userType === 'supervisor')) && {cursor: 'pointer'}),
                                        ...(!canDeleteMember && {gridTemplateColumns: 'max-content auto'}),
                                    }} 
                                    onClick={() => userType === 'user' ? (permissions && permissions.indexOf('lab') > -1 ? userOnClickHandler(s._id) : {}) : {}}
                                >
                                    <div 
                                        style={s?.profilePicture && {backgroundImage: `url(${s?.profilePicture})`}} 
                                        className={cs(styles['avatar'], !s?.profilePicture && styles['empty_avatar'])}
                                    >
                                        {!s?.profilePicture &&
                                            <p>{getFirstLetters(`${s?.firstName} ${s?.lastName}`)}</p>
                                        }
                                    </div>

                                    <div className={cs(styles['info'])}>
                                        <div className={cs(styles['top'])} style={{alignItems: !hasMoreInfo ? 'center' : 'flex-start'}}>
                                            <div style={{maxWidth: userDataMaxWidth}}> 
                                                <span>{s?.firstName} {s?.lastName}</span>
                                                <div className={cs(styles['tooltip'])}> 
                                                    <div className={cs(styles['arrow'])} />
                                                    {s?.firstName} {s?.lastName}   
                                                    <p className={cs(styles['type'])}> {degreeMapper(s?.type)} </p>
                                                </div>
                                            </div>
                                            <div style={{display:'inline', direction:'rtl'}}>{degreeMapper(s?.type)}</div>
                                        </div>

                                        {hasMoreInfo && (
                                            <div className={cs(styles['bottom'])}>
                                                <p> {moreInfo}</p>
                                            </div>
                                        )}
                                    </div>

                                    { canDeleteMember && (
                                        <img 
                                            // src={imageHoverStates[i] ? delRedIcon : delIcon}
                                            src={delIcon}
                                            alt='trash icon'
                                            className={cs(styles['trash_icon'], styles['icon'])}
                                            onClick={(e) => {e.stopPropagation(); deleteOnClickHandler(s._id)}}
                                            // onMouseEnter={() => handleMouseEnter(i)}
                                            // onMouseLeave={() => handleMouseLeave(i)}
                                        />
                                    )}
                                    
                                    { canEditPermissions && (
                                        // <div className={cs(styles['edit_icon_container'])}>
                                            <img 
                                                src={editIcon}
                                                alt='edit icon'
                                                onClick={(e) => {e.stopPropagation(); onClickEditPermissions(s)}}
                                                className={cs(styles['icon'])}
                                            />
                                        // </div>
                                    )}
                                </div>
                            )
                        )
                }
            </div>

            {hasSubmitBtn && (
                <div className={cs(styles['btn_container'])} style={{bottom: btnBottomPos}}>
                    <Button
                        color={btnColor} 
                        onClick={submitChanges}
                        text={btnText} 
                        disabled={btnDisabled}
                        load={btnLoad}
                        width={btnWidth}
                    />
                </div>  
            )}
        </div>
    )
}