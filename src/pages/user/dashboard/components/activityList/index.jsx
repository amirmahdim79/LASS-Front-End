import { default as cs } from 'classnames'
import styles from './style.module.scss'
import { text } from './constants';
import { useSelector } from 'react-redux';
import Preloader from 'components/global/preloaders';
import SwitchV3 from 'components/global/toggleSwitchV3';
import TaskPreview from '../taskPreview';
import emptyList from 'assets/icons/contents/task-square/dark-color.svg'

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
                {loading && <Preloader />}

                {!loading && (
                    state.activityType === 'all' && 
                        (
                            ((currentMilestone === null || !currentMilestone.length ) && !userTasks.length && !taskBounties.lenght)
                                ?
                                    <div className={cs(styles['empty_activities_list'])}>
                                        <img src={emptyList} alt='no activities exists'/>
                                        <p> {text.empty_activities_list} </p>
                                    </div>
                                :
                                    <>
                                        {currentMilestone?.Tasks.map((task, index) => <TaskPreview task={task} now={now} key={index}/>)}
                                        {userTasks.map((task, index) => <TaskPreview task={task} now={now} type={'usertask'} key={index}/>) }
                                        {taskBounties.map((task, index) => <TaskPreview task={task} now={now} type={'task-bounty'} key={index}/>) }
                                    </>
                        )

                )}

                {!loading && (
                    state.activityType === 'milestone' && 
                        (
                            (currentMilestone === null || !currentMilestone.length) 
                                ?
                                    <div className={cs(styles['empty_activities_list'])}>
                                        <img src={emptyList} alt='no activities exists'/>
                                        <p> {text.empty_activities_list} </p>
                                    </div>
                                :
                                    <>
                                        {currentMilestone?.Tasks.map((task, index) => <TaskPreview task={task} now={now} key={index}/>)}

                                    </>
                        )
                )}

                {!loading && (
                    state.activityType === 'userTasks' && 
                        (
                            !userTasks.length
                                ?
                                    <div className={cs(styles['empty_activities_list'])}>
                                        <img src={emptyList} alt='no activities exists'/>
                                        <p> {text.empty_activities_list} </p>
                                    </div>
                                :
                                    <>
                                        {userTasks.map((task, index) => <TaskPreview task={task} now={now} type={'usertask'} key={index}/>) }
                                    </>
                        )
                )}

                {!loading && (
                    state.activityType === 'bounties' && 
                        (
                            !taskBounties.lenght
                                ?
                                    <div className={cs(styles['empty_activities_list'])}>
                                        <img src={emptyList} alt='no activities exists'/>
                                        <p> {text.empty_activities_list} </p>
                                    </div>
                                :
                                    <>
                                        {taskBounties.map((task, index) => <TaskPreview task={task} now={now} type={'task-bounty'} key={index}/>) }
                                    </>
                        )
                )}
            </div>
        </div>
    )
}