import styles from './style.module.scss'
import { default as cs } from 'classnames'
import { isBefore } from 'utils/mapper';
import colors from "styles/colors.module.scss"
import moment from 'moment';
import 'moment/locale/fa';

export default function StatusBox({task}) {

    const checkStatusColor = (task) => {
        if (!isBefore(task.dueDate)) {
            if (task.status) {
                if (moment(task.doneDate).diff(moment(task.dueDate)) < 0) return colors['main-color-50']
            }
            return `transparent`
        }
        else {
            if (task.status) {
                if (moment(task.doneDate).diff(moment(task.dueDate)) < 0) return colors['main-color-50']
                else return colors['warning-dark-50']
            }else {
                return colors['error-50']
            }
        }
    }


    return (
        <div 
            className={cs(styles['container'])} 
            style={{backgroundColor: checkStatusColor(task)}}
        />
    )
}