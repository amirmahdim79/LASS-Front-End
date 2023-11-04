import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import avatar from 'assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal'
import AddUserModal from 'pages/supervisor/dashboard/modals/addUserModal'
import Preloader from 'components/global/preloaders'



export default function UsersList() {

    const navigate = useNavigate();

    const [openAddUserModal, showAddUserModal, closeAddUserModal] = useModal();
    const students = useSelector(state => state.lab.Students);



    const openAddIcon = () => {
        showAddUserModal();
    }

    const closeUsers = () => {
        closeAddUserModal();
        // const myElement = document.getElementById("#users_modal");
    }

    return (
        
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header_container'])}> 
                <div className={cs(styles['columns'])}>
                    <h5> {text.title} </h5>
                    <div className={cs(styles['add_icon_container'])}>
                        <img 
                            src={addIcon}
                            alt='add icon'
                            onClick={() => openAddIcon()}
                        />
                        <div 
                            className={cs(styles['modal'])} style={{display: openAddUserModal ? 'block' : 'none'}} 
                            onClick={() => closeUsers()}
                        />
                        <div className={cs(styles['add_user_modal'], styles['open_style'])} style={{display: openAddUserModal ? 'block' : 'none'}} id='#users_modal'>
                            <AddUserModal close={closeUsers}/>
                        </div>

                    </div>
                   
                </div>

                <div className={cs(styles['columns'])}>
                    <img 
                        src={filterIcon}
                        alt='filter icon'
                    />
                    <img 
                        src={sortIcon}
                        alt='sort icon'
                    />
                </div>

                
            
            </div>
            <div className={cs(styles['students_list'])}>
                {
                    !students
                        ?
                            <Preloader/>
                        : 
                            students && students.map((s, i) => 
                                <div className={cs(styles['student_data_container'])} onClick={() => navigate(`../user_profile/${s._id}`)}>
                                    <div 
                                        style={{background: `url(${avatar})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center center'}} 
                                        className={cs(styles['avatar'])}
                                    />
                                    <div className={cs(styles['user_info'])}>
                                        <div className={cs(styles['top_row'])}>
                                            <p> {s.firstName}  {s.lastName}</p>
                                            <div className={cs(styles['divider'])}></div>
                                            <h6> {s?.type} </h6>
                                        </div>
                                        <div className={cs(styles['bottom_row'])}>
                                            <p> {'تاریخ تحویل نمونع'}</p>
                                        </div>
                                    </div>
                                </div>
                    )
                }
            </div>
        </div>
    )
}