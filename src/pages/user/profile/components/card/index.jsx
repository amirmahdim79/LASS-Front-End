import {default as cs} from 'classnames'
import styles from './style.module.scss'
import smarties from 'assets/icons/user-dev-profile/smarties.svg';
import sand from 'assets/icons/user-dev-profile/sand.svg';
import streak from 'assets/icons/user-dev-profile/streak.svg';

export default function Card({type, value}) {  

    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles[`${type}`])}> {value ? value : '-'} </p>
            {type === 'smarties' && <img src={smarties} alt='smarties icon'/>}
            {type === 'sand' && <img src={sand} alt='sand icon'/>}
            {type === 'streak' && <img src={streak} alt='streak icon'/>}
        </div>
    )
}

