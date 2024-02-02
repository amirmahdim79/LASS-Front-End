
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import taskIcon from 'assets/icons/clipboard-text.svg'
import { useNavigate } from 'react-router-dom';
import TaskStatusBar from 'components/dashboardTaskStatus';
import moment from 'moment';
// import 'moment/locale/fa';

export default function TaskPreview({task, type='milestone-task'}) {

    // moment.locale('fa');

    const navigate = useNavigate();

    const checkTime = (time) => {
        if (time < 10) return `0${time}`
        else return time
    }

    // console.log("task", task);

    return (
        <div 
            className={cs(styles['activity-box'])} 
            onClick={() => navigate(`../${type}/${task._id}/${type === 'milestone-task' ? task.activity === 'upload' ? 'upload' : 'paper' : task.type === 'upload' ? 'upload' : 'paper'}`)}
        >
            <div className={cs(styles['activity-data'])}>
                <div className={cs(styles['right-column'])}> 
                    <div className={cs(styles['icon'])}>
                        <img src={taskIcon} alt='icon'/>
                    </div>
                    <p className={cs(styles['activity-title'])}> {task.name} </p>
                    <TaskStatusBar task={task}/>                                     
                </div>

                <div className={cs(styles['activity-deadline'])}> 
                    {task?.dueDate 
                        ? `${moment(task.dueDate)._d} - ${checkTime(moment(task.dueDate).hour())}:${checkTime(moment(task.dueDate).minute())}`
                        : '-'
                    } 
                </div>
            </div>
            <p className={cs(styles['activity-text'])}> {task.desc} </p>
        </div>
    )

}