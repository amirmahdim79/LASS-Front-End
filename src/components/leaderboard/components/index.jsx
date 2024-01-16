import {default as cs} from 'classnames'
import styles from './style.module.scss'

export default function ShiningStar({left, top}) { 

    return (
        <div className={cs(styles['shining_star'])} style={{top: top, left: left}}>
            <div><span></span></div>
        </div>
    )

}