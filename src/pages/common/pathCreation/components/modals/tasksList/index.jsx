import {default as cs} from 'classnames'
import styles from './style.module.scss'
import routingIcon from 'assets/icons/location/routing/light-color.svg';
import docIcon from 'assets/icons/contents/document-normal/light-color.svg';
import docTextIcon from 'assets/icons/contents/document-text/light-color.svg';
import { text } from 'pages/common/pathCreation/constants';

export default function TasksList({onClick}) { 


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['item'])} onClick={(e) => onClick('upload')}>
                <img 
                    src={docIcon}
                    alt='routing icon'
                    className={cs(styles['icon'])}
                />
                <p> {text.side_subtitle_2} </p>
            </div>
            <div className={cs(styles['item'])} onClick={(e) => onClick('paper')}>
                <img 
                    src={docTextIcon}
                    alt='routing icon'
                    className={cs(styles['icon'])}
                />
                <p> {text.side_subtitle_3} </p>
            </div>
        </div>
    )
}