import { default as cs } from 'classnames'
import SwitchV2 from 'components/global/toggleSwitchV2';
import styles from './style.module.scss'

export default function Row({title, desc, value, onClick, name, id}) {

    return (
        <div className={cs(styles['row'])}>
            <div className={cs(styles['row_header'])}>
                <p> {title} </p>
                <SwitchV2 
                    value={value} 
                    onClick={onClick} 
                    name={name} 
                    id={id}
                />
            </div>
            <p> {desc} </p>
        </div>
    )
}