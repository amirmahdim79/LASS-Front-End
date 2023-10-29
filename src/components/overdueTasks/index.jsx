import { default as cs } from 'classnames'
import styles from './style.module.scss'



export default function OverdueTasks() {

    return (
        <div className={cs(styles['container'])}>
            تسک های عقب افتاده
        </div>
    )
}