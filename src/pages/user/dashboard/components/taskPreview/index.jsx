import { default as cs } from 'classnames'
import styles from './style.module.scss'
import taskIcon from 'assets/icons/clipboard-text.svg'
import smarties from 'assets/icons/user-dev-profile/smarties.svg'
import acceptIcon from 'assets/icons/essential/tick-circle/success-color.svg'
import rejectIcon from 'assets/icons/essential/close-circle/dark-color.svg'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fa';
import TaskStatusBar from '../dashboardTaskStatus'
import useInput from 'hooks/useInputHandler'

export default function TaskPreview({task, now, type='milestone-task'}) {

    moment.locale('fa');

    const navigate = useNavigate();

    const checkTime = (time) => {
        if (time < 10) return `0${time}`
        else return time
    }

    const checkNavigationURL = () => {
        if (type === 'task-bounty') {
            if (task.hasFile) return 'upload'
            else return 'complete'
        }
        else if (type === 'milestone-task') {
            if (task.activity === 'upload') return 'upload'
            else return 'paper'
        } else {
            if (task.type === 'upload') return 'upload'
            else return 'paper'
        }
    }

    const approveTask = () => {
    }


    return (
        <div 
            className={cs(
                styles['activity-box'], 
                type === 'task-bounty' && task.status === 'none' && styles['unclickable-box']
            )} 
            onClick={() => (type !== 'task-bounty' || (type === 'task-bounty' && task.status !== 'none')) && navigate(`../${type}/${task._id}/${checkNavigationURL()}`)}
            // onClick={() =>  navigate(`../${type}/${task._id}/${checkNavigationURL()}`)}
        >
            <div className={cs(styles['activity-data'])}>
                <div className={cs(styles['right-column'])}> 
                    <div className={cs(styles['icon'])}>
                        <img src={taskIcon} alt='icon'/>
                    </div>
                    <p className={cs(styles['activity-title'])}> {task.name} </p>
                    {
                        type==='task-bounty' 
                            ? (
                                <div className={cs(styles['smarties-info'])}>
                                    <img src={smarties} alt='smarties icon'/>
                                    <p> {`+${task?.smarties}`} </p>
                                </div>
                            )
                            : <TaskStatusBar task={task} now={now}/>
                    }
                                                         
                </div>

                <div className={cs(styles['left-column'])}> 
                    {
                        type === 'task-bounty' && (
                            <div className={cs(styles['buttons-container'])} >      
                                <img 
                                    src={acceptIcon}
                                    alt='accept icon'
                                    onClick={() => approveTask()}
                                />
                                <img 
                                    src={rejectIcon}
                                    alt='reject icon'
                                />
                            </div>
                        )
                    }

                    <div className={cs(styles['activity-deadline'])}> 
                        {task?.dueDate 
                            ? `${moment(task.dueDate)._d.toLocaleDateString('fa-IR')} - ${checkTime(moment(task.dueDate).hour())}:${checkTime(moment(task.dueDate).minute())}`
                            : '-'
                        } 
                    </div>
                
                </div>
            </div>

            <p className={cs(styles['activity-text'])}> {task.desc} </p>
        </div>
    )

}