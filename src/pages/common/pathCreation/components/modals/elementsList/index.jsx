import {default as cs} from 'classnames'
import { text } from 'pages/common/pathCreation/constants'
import styles from './style.module.scss'
import routingIcon from 'assets/icons/location/routing/light-color.svg';


export default function ElementsList({onClick}) { 


    return (
        <div className={cs(styles['container'])} onClick={(e) => onClick(e)}>
            <div className={cs(styles['item'])} >
                <img 
                    src={routingIcon}
                    alt='routing icon'
                    className={cs(styles['icon'])}
                />
                <p> {text.side_subtitle_1} </p>
            </div>
        </div>
    )
}