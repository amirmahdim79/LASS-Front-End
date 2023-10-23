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


export default function SideBar({}) {  

    return (
        <aside className={cs(styles['container'])}>
            <div className={cs(styles['logo'])}>
                <Logo />

            </div>
            <img className={cs(styles['icon'])} src={dashboardLight} alt='dashboard icon' />
            <img className={cs(styles['icon'])} src={messagesLight} alt='messages icon' />
            <img className={cs(styles['icon'])} src={folderLight} alt='folder icon' />

            <div className={cs(styles['divider'])} />

            <img className={cs(styles['icon'])} src={clipboardLight} alt='clipboard icon' />
            <img className={cs(styles['icon'])} src={chartLight} alt='chart icon' />
            <img className={cs(styles['icon'])} src={settingsLight} alt='settings icon' />
            <div className={cs(styles['dark-mode'])}>
                <img src={moonLight} alt='moon icon' />
            </div>
        </aside>
    )
}

