import {default as cs} from 'classnames'
import styles from './style.module.scss'

export default function Card({value, title}) {  

    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles['value'])}> {value} </p>
            <p className={cs(styles['title'])}> {title} </p>
        </div>
    )
}

