import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'

export default function ToDos() {


    return (
        <div className={cs(styles['container'])} >
            <div className={cs(styles['header'])} > 
                <h2> {text.title} </h2> 
                <div className={cs(styles['icons'])}>
                    <img 
                        src={filterIcon}
                        alt='filter icon'
                        className={cs(styles['icon'])}
                    />
                    <img 
                        src={sortIcon}
                        alt='sort icon'
                        className={cs(styles['icon'])}
                    />
                </div>  
            </div> 
        </div>
    )
}