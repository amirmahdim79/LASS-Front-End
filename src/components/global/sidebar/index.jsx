import {default as cs} from 'classnames'
import Logo from '../logo'
import styles from './style.module.scss'
import dashboardLight from 'assets/icons/settings/category-2/light-color.svg';
import messagesLight from 'assets/icons/messages/message-notif/light-color.svg';
import folderLight from 'assets/icons/files/folder/light-color.svg';
import clipboardLight from 'assets/icons/contents/clipboard/light-color.svg';
import chartLight from 'assets/icons/business/chart/light-color.svg';
import settingsLight from 'assets/icons/settings/settings-2/light-color.svg';
import moonLight from 'assets/icons/weather/moon/light-color.svg';
import useInput from 'hooks/useInputHandler';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { REMOVE_TOKEN } from "utils/tokenHandler";
import useToast from 'hooks/useToast';


export default function SideBar({type}) { 
    
    const navigate = useNavigate();
    const location = useLocation()
    const { showToast } = useToast();


    const { value: iconNum, setValue: setIconNum } = useInput('1');

    const onClickIcon1 = () => {
        setIconNum('1')
        if ( type === 'user' ) navigate('/user/dashboard')
        else navigate('/supervisor/dashboard')
    }

    const onClickIcon2 = () => {
        setIconNum('2')
        if ( type === 'user' ) navigate('/user/forum')
        else navigate('/supervisor/forum')
    }

    const onClickIcon3 = () => {
        setIconNum('3')
        if ( type === 'user' ) navigate('/user/articles_database')
        else navigate('/supervisor/articles_database')
    }

    const onClickIcon4 = () => {
        setIconNum('4')
        if ( type === 'user' ) navigate('/user/settings')
        else navigate('/supervisor/settings')
    }

    const onClickIcon7 = () => {
        // modal for logout
        setIconNum('7')
        navigate('/')
        REMOVE_TOKEN()
        localStorage.removeItem("type")
        showToast('با موفقیت خارج شدید', 'success')
    }

    useEffect(() => {
        if (type === 'user') {
            if (location.pathname === '/user/dashboard') setIconNum('1')
            else if (location.pathname === '/user/articles_database') setIconNum('3')
        }else {
            if (location.pathname === '/supervisor/dashboard') setIconNum('1')
            else if (location.pathname === '/supervisor/articles_database') setIconNum('3')
        }
    })


    return (
        <aside className={cs(styles['container'])}>
            <div className={cs(styles['logo'])}>
                <Logo />
            </div>

            <img className={cs(styles['icon'], iconNum === '1' && styles['active'])} src={dashboardLight} alt='dashboard icon' onClick={() => onClickIcon1()} />
            <img className={cs(styles['icon'], iconNum === '2' && styles['active'])} src={messagesLight} alt='messages icon'  onClick={() => onClickIcon2()} />
            <img className={cs(styles['icon'], iconNum === '3' && styles['active'])} src={folderLight} alt='folder icon' onClick={() => onClickIcon3()} />

            <div className={cs(styles['divider'])} />

            <img className={cs(styles['icon'])} src={clipboardLight} alt='clipboard icon' />
            <img className={cs(styles['icon'])} src={chartLight} alt='chart icon' />
            <img className={cs(styles['icon'])} src={settingsLight} alt='settings icon' onClick={() => onClickIcon4()}/>
            
            <div className={cs(styles['dark-mode'])}>
                <img src={moonLight} alt='moon icon' className={cs(styles['dark-mode-icon'], iconNum === '7' && styles['active'])} onClick={() => onClickIcon7()}/>
            </div>
        </aside>
    )
}

