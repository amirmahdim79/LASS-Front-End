import styles from './home.module.scss'
import {default as cs} from 'classnames'

export default function HomePage() {
    return (
        <div className={cs(styles['test'], styles['test2'])}>
            HOME
        </div>
    )
}