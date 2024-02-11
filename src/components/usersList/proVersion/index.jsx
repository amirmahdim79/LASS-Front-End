import styles from './style.module.scss'
import { default as cs } from 'classnames'
import { text } from './constants'
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import smarties from 'assets/icons/user-dev-profile/smarties.svg'
import sand from 'assets/icons/user-dev-profile/sand.svg'
import info from 'assets/icons/essential/info-circle/dark-color_2.svg'
import Modal from 'components/global/modal'
import { useModal } from 'hooks/useModal'
import AddUserModal from 'pages/supervisor/dashboard/modals/addUserModal'
import SearchBar from 'components/global/searchbar'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useSelector } from 'react-redux'
import { getFirstLetters } from 'utils/mapper'
import useInput from 'hooks/useInputHandler'
import StatusBox from './components/statusBox'
import { isBefore } from 'utils/mapper'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useLabActions } from 'pages/supervisor/dashboard/hooks/useLabsActions'
import { degreeMapper } from 'utils/mapper'
import { useNavigate } from 'react-router-dom';
import Preloader from 'components/global/preloaders'

export default function UsersList({loading}) {

    const ref = useRef(null);
    const navigate = useNavigate();

    const students = useSelector(state => state.lab.Students);
    const studentsTasks = useSelector(state => state.lab.labStudentsTasks);

    const [openAddMemberModal, showAddMemberModal, closeAddMemberModal] = useModal();
    const [openShowInfoBox, showShowInfoBox, closeShowInfoBox] = useModal();

    const { value: listType, setValue: setListType } = useInput('current');
    const { value: searchKey, setValue: setSearchKey } = useInput('');
    const { value: alumni, setValue: setAlumni } = useInput([]);
    const { value: users, setValue: setUsers } = useInput(students);

    const { getLabAlumni } = useLabActions();


    const calcUnCompletedTasks = (userData) => {
        let num = 0;
        if (userData?.Tasks) {
            userData?.Tasks.map((t, i) => {
                if (isBefore(t.dueDate)) {
                    if (!t.status)  num += 1;
                }
            })
        }
        return num;
    }

    // useEffect(() => {
    //     ref.current && ref.current.scrollIntoView({
    //         behavior: "smooth",
    //         block: "end"
    //     })
    // }, [])


    useEffect(() => {
        if (searchKey) {
            // dispatch(setNavSearchedValue(searchKey))
            const keyDownHandler = event => {    
                if (event.key === 'Enter') {
                    console.log("eeeee", searchKey);
                    // if (searchKey) navigate(`../${localStorage.getItem('type')}/articles-database/?search=${searchKey.trim()}`)
                    // else navigate(`../${localStorage.getItem('type')}/articles-database`)
                }
            };
            document.addEventListener('keydown', keyDownHandler);
        
            return () => {
              document.removeEventListener('keydown', keyDownHandler);
            };
        }
    }, [searchKey]);

    useEffect(() => {
        getLabAlumni()
            .then(res => setAlumni(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (listType === 'current') setUsers(students)
        else setUsers(alumni)
    }, [listType])

    useEffect(() => {
        if (listType === 'current') setUsers(students)
    }, [students])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <div className={cs(styles['row_1'])}>
                    <div className={cs(styles['titles_wrapper'], styles['items'])}>
                        <div className={cs(styles['current_users'])}>
                            <p className={cs(listType === 'current' && styles['clicked_title'])} onClick={() => setListType('current')}> {text.title_1} </p>
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
                                            style={{display: openAddMemberModal ? 'block' : 'none'}} 
                                            className={cs(styles['add_user_modal'])} 
                                        >
                                            <AddUserModal close={closeAddMemberModal}/>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <p className={cs(listType === 'previous' && styles['clicked_title'])} onClick={() => setListType('previous')}> {text.title_2} </p>
                    </div>

                    <div className={cs(styles['tools_wrapper'], styles['items'])}>
                        <div> 
                            <SearchBar 
                                height={'40px'} 
                                borderRadius={'12px'} 
                                placeholder={'نام دانشجو را جست و جو کنید'} 
                                fontSize={'14px'}
                                value={searchKey}
                                setValue={setSearchKey}
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
                <div className={cs(styles['row_2'])}>
                    <div className={cs(styles['cols'], styles['col_1'])}>
                        <CheckBoxV1 checked={false}/>
                        <p> {text.header_1} </p>
                    </div>
                    <div className={cs(styles['cols'], styles['col_2'])}>
                        <p> {text.header_2} </p>
                        <img src={sand} alt='sand icon'/>
                    </div>
                    <div className={cs(styles['cols'], styles['col_3'])}>
                        <p> {text.header_3} </p>
                        <img src={smarties} alt='smarties icon'/>
                    </div>
                    <div className={cs(styles['cols'], styles['col_4'])}>
                        <p> {text.header_4} </p>
                        <div className={cs(styles['info_icon_container'])}>
                            <img 
                                src={info} 
                                alt='info icon' 
                                onClick={() => showShowInfoBox()}
                            />
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
                                            <p> {text.info} </p>
                                        </div>
                                    </div>
                                }
                            />
                        </div>

                       
                    </div>
                </div>
            </div>
            <div className={cs(styles['data'])}>
                {
                    loading 
                        ? <div className={cs(styles['loading_container'])}> <Preloader /> </div> 
                        : (
                            users && users.map((s,i) => 
                                <div key={i} className={cs(styles['row'])}  onClick={() => navigate(`../user_profile/${s._id}`)}>
                                    <div className={cs(styles['user_info_container'])}>
                                        <div 
                                            style={s?.profilePicture && {backgroundImage: `url(${s?.profilePicture})`}} 
                                            className={cs(styles['avatar'], !s?.profilePicture && styles['empty_avatar'])}
                                        >
                                            {!s?.profilePicture &&
                                                <p>{getFirstLetters(`${s?.firstName} ${s?.lastName}`)}</p>
                                            }
                                        </div>
        
                                        <div className={cs(styles['name_container'])}>
                                            <p> {s?.firstName} {s?.lastName} </p>
                                            <p> {degreeMapper(s?.type)} </p>
                                        </div>
                                    </div>
                                    <p> {s?.sand > 0 ? `+${s?.sand}` : `${s?.sand}`} </p>
                                    <div> <p> {s?.smarties} </p> </div>
                                    
                                    <div className={cs(styles['recent_activities'])}>
                                        <div className={cs(styles['status_boxes'])} ref={ref}> 
                                            {
                                                (studentsTasks && studentsTasks.length) ? studentsTasks.find(u => u._id === s._id)?.Tasks.slice(0).reverse().map((t, i) => 
                                                    <div key={i}>
                                                        <StatusBox task={t}/>
                                                    </div>
                                                ) : (
                                                    <p className={cs(styles['activities_msg'])}> در حال حاضر فعالیتی موجود نیست </p>
                                                )
                                            }
                                        </div>
                                        <p> {studentsTasks.length ? calcUnCompletedTasks(studentsTasks.find(u => u._id === s._id)) : ''} </p>
                                    </div>
                                    
                                </div>
                        ))
                }
            </div>
        </div>
    )
}