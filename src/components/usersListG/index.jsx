import { default as cs } from 'classnames'
// import { text } from './constants'
import styles from './style.module.scss'
import functions from "../../styles/mixins/_functions.module.scss"


import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import avatar from 'assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal'
import AddUserModal from 'pages/supervisor/dashboard/modals/addUserModal'
import Preloader from 'components/global/preloaders'
import Modal from 'components/global/modal'

import addIcon from 'assets/icons/essential/add/dark-color.svg'
import delIcon from 'assets/icons/essential/trash/dark-color.svg'
import Button from 'components/global/button'


export default function UsersList({
    bgColor = '',
    btnColor = '',
    btnText = '',
    btnBottomPos = '18px',
    btnWidth = '255px',
    btnDisabled = true,
    btnLoad = true,
    rowGap = '20px',
    borderRadius = '15px',
    padding = '18px 20px',
    width = '340px',
    height = '705px',
    title = 'لیست دانشجویان',
    addMemberModalWidth = '340px',
    addMemberModalHeight = '265px',
    addMemberModalRadius = '12px',
    canAddMember = false,
    canDeleteMember = false,
    canFilterMembers = true,
    canSortMembers = true,
    userHasClickOption = false,
    hasSubmitBtn = false,
    hasMoreInfo = false,
    moreInfo = '',
    students=[],
    userOnClickHandler = () => {},
    deleteOnClickHandler = () => {},
    submitChanges = () => {},
}) {


    const [openAddMemberModal, showAddMemberModal, closeAddMemberModal] = useModal();


    return (
        
        <div className={cs(styles['container'])} style={{minWidth: width, maxWidth: width, minHeight: height}} >
            <div className={cs(styles['header'])}> 
                <div className={cs(styles['column'])}>
                    <h2> {title} </h2> 
                    { canAddMember && (
                        <div className={cs(styles['add_icon_container'])}>
                            <img 
                                src={addIcon}
                                alt='add icon'
                                onClick={() => showAddMemberModal()}
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
                            />
                        )}
                        {canSortMembers && (
                            <img 
                                src={sortIcon}
                                alt='sort icon'
                            />
                        )}
                    </div>
                )}
            </div>

            <div className={cs(styles['users_list'])} style={{rowGap:rowGap}}>
                {
                    !students 
                        ? <Preloader/>
                        : (students && students.map((s, i) => 
                                <div className={cs(styles['user_data_container'], userHasClickOption && styles['clickable_user_data'])} onClick={() => userOnClickHandler(s._id)}>
                                    <div 
                                        style={{backgroundImage: `url(${avatar})`}} 
                                        className={cs(styles['avatar'])}
                                    />
                                    <div className={cs(styles['info'])}>
                                        <div className={cs(styles['top'])} style={{alignItems: hasMoreInfo ? 'center' : 'flex-start'}}>
                                            <p> {s.firstName}  {s.lastName}</p>
                                            <p> {s?.type} </p>
                                        </div>
                                        {hasMoreInfo && (
                                            <div className={cs(styles['bottom'])}>
                                                <p> {moreInfo}</p>
                                            </div>
                                        )}
                                    </div>
                                    { canDeleteMember && (
                                        <img 
                                            src={delIcon}
                                            alt='trash icon'
                                            className={cs(styles['trash_icon'])}
                                            onClick={() => deleteOnClickHandler(s._id)}
                                        />
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
                        onClick={() => submitChanges()}
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