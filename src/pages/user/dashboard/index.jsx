import { default as cs } from 'classnames'
import styles from './style.module.scss'
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { useLabActions } from './hooks/useLabsActions';
import { useDispatch, useSelector } from "react-redux";
import { setPath, setMilestone, setCurrentMilestone, setPrevInd, setEvents, setLabId, setStudents, setUserTasks } from "store/labSlice/index"
import Calendar from 'components/calendar';
import moment from 'moment';
import 'moment/locale/fa';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { getTime } from 'utils/mapper';
import ActivityList from './components/activityList';
import Preloader from 'components/global/preloaders';

export default function UserDashboard() {

    moment.locale('fa');

    const dispatch = useDispatch();

    const initialState = {
        activityType: 'all',
        milestoneTasks: [],        
    }

    const [ state , dispatchStates] = useReducer( reducer, initialState );

    const events = useSelector(state => state.lab.Events);
    const user = useSelector(state => state.user.user);

    const { value: now, setValue: setNow } = useInput('');
    const { value: loading, setValue: setLoading } = useInput(true);
    const { value: taskBounties, setValue: setTaskBounties } = useInput([]);

    const { getMyLabs, getLabEvents, getUserTasks, getLabBounties } = useLabActions();

    const getEvents= (labId) => {
        getLabEvents({'date': `${now.month()+1}/${now.date()}/${now.year()}`}, `/${labId}`)
        .then(res => dispatch(setEvents(res.data)))
        .catch(err => console.log(err))
    }

    const getAllUserTasks = () => {
        getUserTasks()
            .then(res => dispatch(setUserTasks(res.data)))
            .catch(err => console.log(err))
    }

    const getAllBountyTasks = (labId) => {
        getLabBounties({}, `?lab=${labId}&status=none`) 
            .then(res => {
                const tasks = res.data.filter((task) => {
                    const index = task.PotentialList.findIndex(u => u._id === user._id);
                    if (index > -1) return task;
                })
                setTaskBounties(tasks)
            })
            .catch(err => console.log(err))
    }

    const changeActivityType = (value) => {
        dispatchStates({payload: {type: 'activityType', value: value}})
    }

    useEffect(() => {
        getMyLabs().then(res => {
            if (res.data) {
                dispatch(setPath(res.data.Paths))
                dispatch(setMilestone(res.data.Paths[0].Milestones))
                dispatch(setStudents(res.data.Students))
                dispatch(setLabId(res.data._id))
    
                if(now) getEvents(res.data._id)
    
                for (const [i, milestone] of res.data.Paths[0].Milestones.entries()) {
                    if (milestone.status[0] === null) {
                        dispatch(setCurrentMilestone(milestone));
                        dispatchStates({payload: {type: 'milestoneTasks', value: milestone?.Tasks}})
                        if (i === 0) dispatch(setPrevInd(0))
                        else dispatch(setPrevInd(i-1))
                        break;
                    }
                }
    
                getAllUserTasks();
                if(user) getAllBountyTasks(res.data._id);
            }
        }).catch(err => console.log(err))
        .finally(() =>setLoading(false))

    }, [now, user])

    useEffect(() => {
        getTime(setNow)
    }, [])

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['calendar_container'])}>
                {
                    now 
                        ? <Calendar events={events} date={now} setDate={setNow} getEvents={getEvents}/>
                        : <Preloader />
                }
                
            </div>
            <ActivityList 
                state={state} 
                loading={loading} 
                now={now} 
                changeActivityType={changeActivityType} 
                taskBounties={taskBounties}
            />

        </div>
    )
}

