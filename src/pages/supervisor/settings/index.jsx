import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersListG'
import { useNavigate } from 'react-router-dom';
import Groups from 'components/groupsList'

export default function SupSettings() { 

    const articles = useSelector(state => state.user.articles);
    const students = useSelector(state => state.lab.Students);

    const { value: allPapers, setValue: setAllPapers } = useInput([]);

    const navigate = useNavigate();

    const onClickUser = (userId) => {
        navigate(`../user_profile/${userId}`)
    }

    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['goups_container'])}>
                    <Groups />
                </div>
                <div className={cs(styles['path_container'])}>
                    <p> مسیر‌راه‌ها </p>
                    <img 
                        src={ways}
                        alt='ways'
                    />
                </div>
                <div className={cs(styles['calendar_container'])}>

                </div>
            </div>
            <UsersList 
                canDeleteMember={true}
                students={students}
            />
        </div>
    )
}
