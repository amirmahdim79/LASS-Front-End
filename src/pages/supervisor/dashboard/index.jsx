import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './dashboard.module.scss'
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
import { setPath, setStudents, setEvents, setLabId } from "store/labSlice/index"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LabSummary from 'components/labSummary'
import OverdueTasks from 'components/overdueTasks'
import EnrollmentRequests from 'components/global/enrollmentRequests'
import useInput from 'hooks/useInputHandler'
import moment from 'moment';
import 'moment/locale/fa';
import Calendar from 'components/calendar'
import UsersList from 'components/usersListG'



export default function SupervisorDashboard() {

    moment.locale('fa');

    const dispatchLab = useDispatch();
    const navigate = useNavigate();

    const events = useSelector(state => state.lab.Events);
    const path = useSelector(state => state.lab.Paths);
    const students = useSelector(state => state.lab.Students);


    const { value: now, setValue: setNow } = useInput(moment());

    const [open, show, close] = useModal();
    const { getMyLabs, createLabs, getLabEvents } = useLabActions();
    
    const initialState = {
        name: '',
        desc: '',
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const openLabCreationModal = () => {
        show();
    }

    const createLab = () => {
        createLabs({name: state.name, desc: state.desc}).then(res => {
            console.log("createeeeeeeeeeeeeeee", res);
        }).catch(err => {
            console.log("e22222222222222222222", err);
        })
    }
    
    const cancel = () => {
        dispatch({payload: {type: 'reset', value: initialState}})
        close();
    }

    const getEvents = (labId) => {
        getLabEvents({'date': `${now.month()+1}/${now.date()}/${now.year()}`}, `/${labId}`)
            .then(res => {
                dispatchLab(setEvents(res.data))
            }).catch(err => {
                console.log( err);
            })
    }


    useEffect(() => {
        getMyLabs({}, '?sups=true').then(res => {
            // console.log("rrrrrrrrrrrrr", res);
            dispatchLab(setPath(res.data.Paths))
            dispatchLab(setStudents(res.data.Students))
            dispatchLab(setLabId(res.data._id))

            getEvents(res.data.Paths[0]?.Lab)
        }).catch(err => {
            console.log("eeeeeeeeeeee", err);
        })
    }, [])

    // useEffect(() => {
    //     if (path) {
    //         getEvents()
    //     }
    // }, [now, path])

    const openUserProfile = (uId) => {
        navigate(`../user_profile/${uId}`)
        // dispatch(addUser(res.data))
    }



    return (
        <div className={cs(styles['container'])} >
            <div className={cs(styles['boxes_container'])}>
                <div className={cs(styles['top_container'])}>
                    <Calendar events={events} date={now} setDate={setNow} getEvents={getEvents}/>
                </div>

                <div className={cs(styles['right_container'])}>
                    {/* <UsersList /> */}
                    <UsersList
                        students={students}
                        width={'unset'}
                        hasMoreInfo={true}
                        moreInfo={'تاریخ تحویل نمونه'}
                        userHasClickOption={true}
                        userOnClickHandler={(uId) => openUserProfile(uId)}
                        userDataMaxWidth={'14vw'}
                    />

                </div>

                <div className={cs(styles['left_container'])}>
                    <LabSummary />
                    <div className={cs(styles['inner_container'])}>
                        <OverdueTasks />
                        <EnrollmentRequests />
                    </div>
                </div>                
            </div>



            {/* <div className={cs(styles['lab_creator_box'])}>
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
                                    opacity={'0.7'}
                                />
                            </div>
                            <div>
                                <TextAreaV1 
                                    name={'description'}
                                    value={state.desc}
                                    onChange={(e)=>dispatch({payload: {type: 'desc', value: e.target.value}})}
                                    placeholder={text.input_2} 
                                    rows={'4'}
                                    opacity={'0.7'}
                                />
                            </div>
                        </div>

                        <div className={cs(styles['buttons_container'])}>
                            <Button
                                color={colors['main-color-100']} 
                                onClick={() => createLab()}
                                text={text.button_1} 
                                // disabled={!email || !password}
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
            </div> */}
        </div>
    )
}