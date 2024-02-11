import { default as cs } from 'classnames'
import styles from './style.module.scss'
import { text } from './constants';
import { useSelector } from 'react-redux';
import Preloader from 'components/global/preloaders';
import SwitchV3 from 'components/global/toggleSwitchV3';
import TaskPreview from '../taskPreview';

export default function ActivityList({state, loading, now, changeActivityType, taskBounties}) {

    const currentMilestone = useSelector(state => state.lab.CurrentMilestone);
    const userTasks = useSelector(state => state.lab.userTasks);


    return (
        <div className={cs(styles['upcoming_activities_container'])}>
            <div className={cs(styles['title'])}>
                <div> 
                    <p> {text.title}  </p>
                    <div className={cs(styles['filtering_inputs'])}>
                        <SwitchV3
                            value={state.activityType}
                            valueName_r={'all'} 
                            valueName_m={'milestone'} 
                            valueName_l={'userTasks'}
                            title_r={text.mode_1}
                            title_m={text.mode_2}
                            title_l={text.mode_3}
                            onClick={changeActivityType}
                        />
                        <div className={cs(styles['bounties_filter'], state.activityType === 'bounties' && styles['active_bounties_filter'])} onClick={() => changeActivityType('bounties')}> 
                            <p> {text.mode_4} </p>
                        </div>
                    </div>
                    
                </div>
                <p> {text.deadline} </p>
            </div>
            <div className={cs(styles['activities'])}>
                {
                    (!(loading))
                        ? 
                            <>
                                {(state.activityType === 'all' || state.activityType === 'milestone') && currentMilestone?.Tasks.map((task, index) => <TaskPreview task={task} now={now} key={index}/>)}
                                {(state.activityType === 'all' || state.activityType === 'userTasks') && userTasks.map((task, index) => <TaskPreview task={task} now={now} type={'usertask'} key={index}/>) }
                                {(state.activityType === 'all' || state.activityType === 'bounties') && taskBounties.map((task, index) => <TaskPreview task={task} now={now} type={'task-bounty'} key={index}/>) }
                            </>
                        : <Preloader />
                }
            </div>
        </div>
    )
}