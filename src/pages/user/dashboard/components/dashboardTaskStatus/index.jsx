import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fa';
import { isBefore } from 'utils/mapper';
import { getTime } from 'utils/mapper';

export default function TaskStatusBar({task, now}) {
    moment.locale('fa');

    const { value: taskStatus, setValue: setTaskStatus } = useInput('');

    useEffect(() => {
            if (task.status) {
                setTaskStatus({
                    text: 'انجام شده',
                    style: {
                        'background-color': colors['success-60'],
                        'color': colors['dark-shades-100']
                    }
                })
            } else {
                if (task?.dueDate) {
                    if (isBefore(task?.dueDate, now)) {
                        setTaskStatus({
                            text: 'تاخیر در ارائه',
                            style: {
                                'background-color': colors['error-60'],
                                'color': colors['light-shades-100']
                            }
                        })
            
                    } else {
                        let due = moment(task?.dueDate, 'YYYY/MM/DD');
                        let tod = moment(now, 'YYYY/MM/DD');
                        let dueArr = [+due.format('YYYY'), +due.format('MM'), +due.format('DD')]
                        let todArr = [+tod.format('YYYY'), +tod.format('MM'), +tod.format('DD')]
    
                        if (moment(todArr).diff(moment(dueArr), 'days') <= 0 && moment(todArr).diff(moment(dueArr), 'days') >= -2) {
                            setTaskStatus({
                                text: 'نزدیک مهلت انجام',
                                style: {
                                    'background-color': colors['warning-100'],
                                    'color': colors['dark-shades-100']
                                }
                            })
                        } 
                    }
                } else {
                    setTaskStatus({
                        text: 'وابسته به زمان نیست',
                        style: {
                            'background-color': 'transparent',
                            'color': colors['dark-shades-100'],
                            'border': '1px solid #ffffff'
                        }
                    })
                }
            }
    }, [task])



    return (
        <div className={cs(styles['container'])} style={taskStatus.style}>
           {taskStatus.text}
        </div>

    )
}

