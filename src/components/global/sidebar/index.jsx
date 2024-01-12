import {default as cs} from 'classnames'
import Logo from '../logo'
import styles from './style.module.scss'
import dashboardLight from 'assets/icons/settings/category-2/light-color.svg';
import messagesLight from 'assets/icons/messages/message-notif/light-color.svg';
import folderLight from 'assets/icons/files/folder/light-color.svg';
import emailLight from 'assets/icons/messages/sms/light-color.svg';
import profileLight from 'assets/icons/users/user/light-color.svg';
import settingsLight from 'assets/icons/settings/settings-2/light-color.svg';
import moonLight from 'assets/icons/weather/moon/light-color.svg';
import useInput from 'hooks/useInputHandler';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


export default function SideBar({type}) { 
    
    const navigate = useNavigate();
    const location = useLocation()


    const { value: iconNum, setValue: setIconNum } = useInput('1');

    const openDashboard = () => {
        setIconNum('1')
        if ( type === 'user' ) navigate('/user/dashboard')
        else navigate('/supervisor/dashboard')
    }

    const openForum = () => {
        setIconNum('2')
        if ( type === 'user' ) navigate('/user/forum')
        else navigate('/supervisor/forum')
    }

    const openArticlesDatabase = () => {
        setIconNum('3')
        if ( type === 'user' ) navigate('/user/articles-database')
        else navigate('/supervisor/articles-database')
    }

    const openEmails = () => {
        setIconNum('4')
        if ( type === 'user' ) navigate('/user/new-email')
        else navigate('/supervisor/new-email')
    }

    const openProfile = () => {
        setIconNum('5')
        navigate('./my-profile')
    }

    const openSettings = () => {
        setIconNum('6')
        if ( type === 'user' ) navigate('/user/settings')
        else navigate('/supervisor/settings')
    }

    const enableDarkMode = () => {
        // modal for logout
        setIconNum('7')
        
    }

    useEffect(() => {
        if (type === 'user') {
            if (location.pathname === '/user/dashboard') setIconNum('1')
            else if (location.pathname === '/user/articles-database') setIconNum('3')
        }else {
            if (location.pathname === '/supervisor/dashboard') setIconNum('1')
            else if (location.pathname === '/supervisor/articles-database') setIconNum('3')
        }
    })


    return (
        <aside className={cs(styles['container'])}>
            <div className={cs(styles['logo'])}>
                <Logo />
            </div>

            <img className={cs(styles['icon'], iconNum === '1' && styles['active'])} src={dashboardLight} alt='dashboard icon' onClick={() => openDashboard()} />
            <img className={cs(styles['icon'], iconNum === '2' && styles['active'])} src={messagesLight} alt='messages icon'  onClick={() => openForum()} />
            <img className={cs(styles['icon'], iconNum === '3' && styles['active'])} src={folderLight} alt='folder icon' onClick={() => openArticlesDatabase()} />

            <div className={cs(styles['divider'])} />

            <img className={cs(styles['icon'], iconNum === '4' && styles['active'])} src={emailLight} alt='email icon' onClick={() => openEmails()} />
            <img className={cs(styles['icon'], iconNum === '5' && styles['active'])} src={profileLight} alt='profile icon' onClick={() => openProfile()} />
            <img className={cs(styles['icon'], iconNum === '6' && styles['active'])} src={settingsLight} alt='settings icon' onClick={() => openSettings()}/>
            
            <div className={cs(styles['dark-mode'])}>
                <img src={moonLight} alt='moon icon' className={cs(styles['dark-mode-icon'], iconNum === '7' && styles['active'])} onClick={() => enableDarkMode()}/>
            </div>
        </aside>
    )
}

