import { default as cs } from 'classnames'
import styles from './style.module.scss'



export default function EnrollmentRequests() {

    return (
        <div className={cs(styles['container'])}>
            درخواست های عضویت در آزمایشگاه
        </div>
    )
}