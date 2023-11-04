import {default as cs} from 'classnames'
import styles from './style.module.scss'



export default function ProfileV1({profile, width, height}) {  

    return (
        <div className={cs(styles['container'])} style={{width: width, height: height}}>
            <img src={profile} alt='avatar' />
        </div>
    )
}

