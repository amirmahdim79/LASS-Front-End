import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';
import settings from 'assets/icons/settings/settings-2/dark-color.svg';
import notification from 'assets/icons/notifications/notification/dark-color.svg';
import settings2 from 'assets/icons/settings/settings-4/dark-color.svg';
import SearchBar from '../searchbar';



export default function Navbar({type}) {  
    const navigate = useNavigate();
    // hover animation

    return (
        <nav className={cs(styles['container'])}>
            <div className={cs(styles['icons_container'])}>
                <img className={cs(styles['icon'])} src={settings} alt='settings icon' />
                <img className={cs(styles['icon'])} src={notification} alt='notification icon' />
                <img className={cs(styles['icon'])} src={settings2} alt='settings icon' onClick={() => type === 'user' && navigate('./my_profile')}/>
            </div>
            <div className={cs(styles['searchbar_container'])}>
                <SearchBar />
            </div>
        </nav>
    )
}

