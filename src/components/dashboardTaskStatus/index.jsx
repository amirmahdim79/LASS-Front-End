import { default as cs } from 'classnames'
import { text } from './constants';
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"


export default function TaskStatusBar({status}) {

    const colorDecider = (status) => {
        if (status === text.status_1) {
            return {
                'background-color': colors['error-60'],
                'color': colors['light-shades']
            }
        } else if (status === text.status_2) {
            return {
                'background-color': colors['warning-60'],
                'color': colors['dark-shades']
            }
        } else if (status === text.status_3) {
            return {
                'background-color': colors['success-60'],
                'color': colors['dark-shades']
            }
        }
    }



    return (
        <div className={cs(styles['container'])} style={colorDecider(status)}>
           {status}
        </div>

    )
}

