import {default as cs} from 'classnames'
import styles from './style.module.scss'
import smarties from 'assets/icons/user-dev-profile/smarties.svg';
import sand from 'assets/icons/user-dev-profile/sand.svg';
import streak from 'assets/icons/user-dev-profile/streak.svg';
import add from 'assets/icons/essential/add-square/main-color.svg';

export default function Card({type, value, onClick}) {  

    const userType = localStorage.getItem('type');

    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles[`${type}`])}> {value ? value : '-'} </p>
            {type === 'smarties' && <div>
                <img src={smarties} alt='smarties icon'/> 
                {userType === 'supervisor' && <img src={add} alt='add icon' className={cs(styles['add_icon'])} onClick={() => onClick(type)}/>}
            </div>}
            {type === 'sand' && <div>
                <img src={sand} alt='sand icon'/>
                {userType === 'supervisor' && <img src={add} alt='add icon' className={cs(styles['add_icon'])} onClick={() => onClick(type)}/>}
                
            </div>}
            {type === 'streak' &&  <img src={streak} alt='streak icon'/>}
        </div>
    )
}

