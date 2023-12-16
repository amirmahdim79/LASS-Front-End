import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import delIcon from 'assets/icons/essential/trash/error-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersListG'
import { useNavigate, useParams } from 'react-router-dom';
import Groups from 'components/groupsList'
import colors from "styles/colors.module.scss"


import user1 from 'assets/user3.svg';
import user2 from 'assets/user1.svg';
import user3 from 'assets/user4.svg';
import user4 from 'assets/user2.svg';
import user5 from 'assets/user5.svg';
import user6 from 'assets/user6.svg';
import user7 from 'assets/user7.svg';

import avatar from 'assets/images/avatar.png'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import SearchBar from 'components/global/searchbar'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useModal } from 'hooks/useModal'
import Modal from 'components/global/modal'
import DeleteModal from './components/deleteModal'


export default function GroupSettings() { 

    const params = useParams();

    const [openDeleteModal, showDeleteModal, closeDeleteModal] = useModal();

    const articles = useSelector(state => state.user.articles);
    const students = useSelector(state => state.lab.Students);

    const { value: allPapers, setValue: setAllPapers } = useInput([]);

    const navigate = useNavigate();

    const groups = [
        {
            type: 'کارشناسی',
            users: [
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user1,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user2,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user3,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user4,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user5,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user6,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user7,
                    type: 'کارشناسی',
                },
            ],
            id: '0'
        },
        {
            type: 'ارشد',
            users: [
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user1,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user2,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user3,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user4,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user5,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user6,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user7,
                    type: 'کارشناسی',
                },
            ],
            id: '1'
        },
        {
            type: 'i-lab',
            users: [
                {
                    firstName: 'فاطمه',
                    lastName: 'اسماعیلی',
                    avatar: user1,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'امیرمهدی',
                    lastName: 'محمدیان',
                    avatar: user2,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user3,
                    type: 'کارشناسی',
                },
            ],
            id: '2'
        },
        {
            type: 'دکتری',
            users: [
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user1,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user2,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user3,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user4,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user5,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user6,
                    type: 'کارشناسی',
                },
                {
                    firstName: 'علیرضا',
                    lastName: 'ابراهیمی',
                    avatar: user7,
                    type: 'کارشناسی',
                },
            ],
            id: '3'
        },
    ]
    
    const users = [
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'علیرضا ابراهیمی',
            checked: true,
            grade: 'کارشناسی'
        },
        {
            name: 'امیرمهدی محمدیان',
            checked: true,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'فاطمه اسماعیلی',
            checked: true,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        {
            name: 'آبتین هدجی',
            checked: false,
            grade: 'کارشناسی'
        },
        
    ]

    const cancelDelete = () => {
        closeDeleteModal()
    }

    const SubmitDelete = () => {
        closeDeleteModal()
    }

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['header'])}>
                    <h1> {text.title} </h1>
                    <img 
                        src={delIcon}
                        alt='trash icon'
                        onClick={() => showDeleteModal()}
                    />
                </div>
                <div className={cs(styles['data_container'])}>
                    <TextInputV2 
                        fontFamily={'pinar_reg'}
                        // onChange={} 
                        // placeholder={''}
                        value={groups[params.id].type}
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
                                <CheckBoxV1 checked={false}/>
                                <p> {text.header_1} </p>
                            </div>
                            <div className={cs(styles['col_2'])}>
                                <p> {text.header_2} </p>
                            </div>
                            <div className={cs(styles['data'])}>
                                {users.map((user, i) => 
                                    <div key={i} className={cs(styles['row'])} >
                                        <div className={cs(styles['name_wrapper'])}>
                                            <CheckBoxV1 checked={user.checked}/>
                                            <div 
                                                style={{backgroundImage: `url(${avatar})`}} 
                                                className={cs(styles['avatar'])}
                                            />
                                            <span> {user?.name} </span>
                                        </div>
                                        <div className={cs(styles['grade_wrapper'])}>
                                            <p> {user.grade} </p>
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
                students={groups[params.id].users}
                canDeleteMember={true}
                hasSubmitBtn={true}
                btnDisabled={false}
                btnLoad={false}
            />

            <Modal
                isOpen={openDeleteModal} 
                close={closeDeleteModal} 
                content={
                    <div className={cs(styles['delete_modal'])} style={{display: openDeleteModal ? 'block' : 'none'}} >
                        <DeleteModal
                            onCancel={cancelDelete}
                            onSubmit={SubmitDelete}
                        />
                    </div>
                }
            />
        </div>
    )
}
