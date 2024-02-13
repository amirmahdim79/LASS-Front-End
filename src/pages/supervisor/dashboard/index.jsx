import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import emptyBox from 'assets/icons/empty_data.svg'
import Button from 'components/global/button'
import colors from "styles/colors.module.scss"
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1'
import { useModal } from 'hooks/useModal'
import { useEffect } from 'react'
import { useLabActions } from './hooks/useLabsActions'
import { useReducer } from 'react'
import { reducer } from './reducers'
import { setPath, setStudents, setEvents, setLabId, setLabStudentsTasks, setSupsTasks } from "store/labSlice/index"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInputHandler'
import moment from 'moment';
import 'moment/locale/fa';
import Calendar from 'components/calendar'
import ToDos from '../../../components/toDos'
import UsersList from 'components/usersList/proVersion'
import { getTime } from 'utils/mapper'
import Preloader from 'components/global/preloaders'
import { getCurrentTime } from 'utils/mapper'
import { setSupHasLab } from 'store/userSlice'


export default function SupervisorDashboard() {

    moment.locale('fa');

    const navigate = useNavigate();
    const dispatchLab = useDispatch();

    const { getMyLabs, createLabs, labCreation, getLabEvents, getLabStudentsTasks, getSupsTasks } = useLabActions();
    const [open, show, close] = useModal();

    const initialState = {
        name: '',
        desc: '',
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const events = useSelector(state => state.lab.Events);
    const hasLab = useSelector(state => state.user.supHasLab);

    const { value: now, setValue: setNow } = useInput('');
    const { value: loading, setValue: setLoading } = useInput(true);

    const openLabCreationModal = () => {
        show();
    }

    const createLab = () => {
        createLabs({name: state.name, desc: state.desc})
            .then(res => {
                dispatchLab(setLabId(res.data._id))
                dispatchLab(setSupHasLab(true));
                close();
            }).catch(err => {
                console.log(err);
            })
    }
    
    const cancel = () => {
        dispatch({payload: {type: 'reset', value: initialState}})
        close();
    }

    const getEvents = (labId) => {
        getLabEvents({'date': `${now.month()+1}/${now.date()}/${now.year()}`}, `/${labId}`)
            .then(res => dispatchLab(setEvents(res.data)))
            .catch(err => console.log( err))
    }

    const getStudentsTasks = (labId) => {
        getLabStudentsTasks({}, `?lab=${labId}`)
            .then(res => dispatchLab(setLabStudentsTasks(res.data)))
            .catch(err => console.log(err))
    }

    const getTasks = () => {
        getSupsTasks()
            .then(res => dispatchLab(setSupsTasks(res.data)))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        getMyLabs({}, '?sups=true')
            .then(res => {
                if (res.data) {
                    dispatch(setSupHasLab(true));    
                    dispatchLab(setPath(res.data.Paths))
                    dispatchLab(setStudents(res.data.Students))
                    dispatchLab(setLabId(res.data._id))
        
                    if(now) getEvents(res.data._id)
                    getStudentsTasks(res.data._id)
                    getTasks()
                } else dispatch(setSupHasLab(false));
            }).catch(err => console.log(err))
        .finally(() =>setLoading(false))

    }, [now])

    useEffect(() => {
        getTime(setNow)
    }, [])


    return (
        <div className={cs(styles['container'])} >
            {
                hasLab === true && (
                    <div className={cs(styles['boxes_container'])}>
                        <div className={cs(styles['calendar_container'])}>
                        {
                            now 
                                ? <Calendar events={events} date={now} setDate={setNow} getEvents={getEvents}/>
                                : <Preloader />
                        }                    
                        </div>
        
                        <div className={cs(styles['users_container'])}>
                            <UsersList loading={loading}/>
                            <ToDos loading={loading}/>
                        </div>
        
                    </div>
                )
            }
            {
               hasLab === false &&  (
                <div className={cs(styles['lab_creator_box'])}>
                    <h3> {text.title} </h3>
                    <img 
                        src={emptyBox}
                        alt='empty box'
                    />
                    <div style={{textAlign:' center'}}>
                        <p> {text.subtitle_1} </p>
                        <p> {text.subtitle_2} </p>
                    </div>
    
                    <div className={cs(styles['button_container'])}>
                        <Button
                            color={colors['main-color-100']} 
                            onClick={() => openLabCreationModal()}
                            text={text.button} 
                            // disabled={!email || !password}
                        />
                    </div>
                    
    
                    <div className={cs(styles['lab_creation_modal'], styles['opacity'])} style={{display: open ? 'block' : 'none'}}> 
                        <div className={cs(styles['modal_content'])}>
                            <div className={cs(styles['inputs_container'])}>
                                <div>
                                    <TextInputV2 
                                        value={state.name}
                                        onChange={(e)=>dispatch({payload: {type: 'name', value: e.target.value}})}
                                        placeholder={text.input_1} 
                                        dir={'rtl'}
                                    />
                                </div>
                                <div>
                                    <TextAreaV1 
                                        name={'description'}
                                        value={state.desc}
                                        onChange={(e)=>dispatch({payload: {type: 'desc', value: e.target.value}})}
                                        placeholder={text.input_2} 
                                        rows={'4'}
                                        resizable={false}
                                    />
                                </div>
                            </div>
    
                            <div className={cs(styles['buttons_container'])}>
                                <Button
                                    color={colors['main-color-100']} 
                                    onClick={() => createLab()}
                                    text={text.button_1} 
                                    load={labCreation}
                                    disabled={!state.name.trim().length || !state.desc.trim().length}
                                />
                                <Button
                                    color={colors['main-color-100']} 
                                    onClick={() => cancel()}
                                    text={text.button_2} 
                                    outlined={true}
                                    // disabled={!email || !password}
                                />
                            </div>
                        </div> 
                    </div>
                </div>
                )
            }
            {
                hasLab === null && <Preloader />
            }
        </div>
    )
}