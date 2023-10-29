import { default as cs } from 'classnames'
import styles from './style.module.scss'
import preloader from 'assets/gifs/data_preloader.gif'




export default function Preloader() {

    return (
        <div className={cs(styles['container'])}>
            <img 
                src={preloader}
                alt='loading'
            />
        </div>
    )


}