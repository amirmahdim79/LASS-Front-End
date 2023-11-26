import { default as cs } from 'classnames'
import Button from 'components/global/button'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import { useReducer } from 'react'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { text } from './constants'
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1'
import { Calendar, CalendarProvider } from "zaman";

import infoIcon from 'assets/icons/essential/info-circle/light-color.svg';
import clockIcon from 'assets/icons/time/clock/light-color.svg';
import repeatIcon from 'assets/icons/arrow/repeat/light-color.svg';
import tickIcon from 'assets/icons/essential/tick-square/light-color.svg';
import usersIcon from 'assets/icons/users/people/light-color.svg';
import sortIcon from 'assets/icons/essential/sort/light-color.svg';
import filterIcon from 'assets/icons/essential/filter/light-color.svg';
import { useState } from 'react'
import moment from 'moment'
import jaMoment from 'jalali-moment'
import useInput from 'hooks/useInputHandler'
import { useEffect } from 'react'
import { weekday, month } from 'utils/mapper'
import TextInput from 'components/global/inputs/textInput'
import { reducer } from './reducer'
import CheckBoxV2 from 'components/global/checkbox/v2'
import { useSelector } from 'react-redux'
import { useCreateEventActions } from './hooks/useCreateEventActions'



export default function AddEventModal({close, type, setType, getEvents}) {

    const { createEvent } = useCreateEventActions();

    const path = useSelector(state => state.lab.Paths);
    const userInfo = useSelector(state => state.user.user);
    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);

    
    const { value: initValue, setValue: setInitValue } = useInput(moment());
    const { value: endValue, setValue: setEndValue } = useInput(moment());

    const { value: initDay, setValue: setInitDay } = useInput('');
    const { value: initDate, setValue: setInitDate } = useInput('');
    const { value: initTime, setValue: setInitTime } = useInput({});
    const { value: endDay, setValue: setEndDay } = useInput('');
    const { value: endDate, setValue: setEndDate } = useInput('');
    const { value: endTime, setValue: setEndTime } = useInput({});
    const { value: dateWidth, setValue: setDateWidth } = useInput(10);
    const { value: showInterval, setValue: setShowInterval } = useInput(false);
    const { value: showUsers, setValue: setShowUsers } = useInput(false);


    const initialState = {
        activity: '',
        name: '',
        desc: '',

        initHour: '',
        initMin: '',
        initSec: '',
        endHour: '',
        endMin: '',
        endSec: '',

        repetitionValue: '',
        repetitionBtn1: true,
        repetitionBtn2: false,
        repetitionBtn3: false,

        weekDay: '',
        weekDayNum: undefined,

        intervalBtn: false,

        intervalValueBtn1: '1',
        year: '',
        month: '',
        day: '',

        selectedUser: '',
        usersList: []

    }

    const [ state , dispatch] = useReducer( reducer, initialState );


    // console.log(".........",  moment(initValue._d + ' ' + `${state.initHour}:${state.initMin}:${state.initSec}`));
    // console.log("1111", initValue.year(), initValue.month(), initValue.date(), state.initHour, state.initMin, state.initSec);
    // console.log(".....aa", new Date(initValue.year(), initValue.month(), initValue.date(), state.initHour, state.initMin, state.initSec));

    // console.log("fuck", moment(`${initValue.date()}/${initValue.month()}/${initValue.year()} 09:15:00`, "DD MM YYYY hh:mm:ss"));




    useEffect(() => {
        let todayDay = initValue.day() === 6 ?  weekday(initValue.day() %6 ): weekday(initValue.day() + 1 );
        let todayDate = `${initValue._d.toLocaleDateString('fa-IR').split('/')[2]}  ${month(initValue._d.toLocaleDateString('fa-IR').split('/')[1])} `;
        setInitDay(todayDay);
        setEndDay(todayDay);
        setInitDate(todayDate);
        setEndDate(todayDate);
        setEndValue(initValue)
    }, [initValue])

    useEffect(() => {
        let todayDay = endValue.day() === 6 ?  weekday(endValue.day() %6 ): weekday(endValue.day() + 1 );
        let todayDate = `${endValue._d.toLocaleDateString('fa-IR').split('/')[2]}  ${month(endValue._d.toLocaleDateString('fa-IR').split('/')[1])} `;
        setEndDay(todayDay);
        setEndDate(todayDate);
    }, [endValue])

    useEffect(() => {
        if (state.repetitionBtn1)  dispatch({payload: {type: 'intervalBtn', value: false}})
    }, [state.repetitionBtn1])

    const onClickModal = (e) => {
        if (type) {
            const targetClassList = e.target.classList;
            const targetParentClassList = e.target.parentElement.classList;

            if (targetClassList.value) {
                if (targetClassList[0].includes('container') || targetClassList[0].includes('inputs') || targetClassList[0].includes('time_warpper') || 
                    targetClassList[0].includes('time_inputs') || targetClassList[0].includes('time_input') || targetClassList[0].includes('repetition_inputs') ||
                    targetClassList[0].includes('checkbox_wrapper') || targetClassList[0].includes('checkboxes') || targetClassList[0].includes('interval_inputs') ||
                    targetClassList[0].includes('users') || targetClassList[0].includes('header') || targetClassList[0].includes('users_name') ||
                    targetClassList[0].includes('btn_container') || targetClassList[0].includes('btn')) setType('')
            }else {
                if ( targetParentClassList[0].includes('container') || targetParentClassList[0].includes('input_container') || targetParentClassList[0].includes('time_warpper') || 
                    targetParentClassList[0].includes('time_input') || targetParentClassList[0].includes('datepicker_wrapper') || targetParentClassList[0].includes('datepicker') ||
                    targetParentClassList[0].includes('title') || targetParentClassList[0].includes('interval_inputs') || targetParentClassList[0].includes('header')) setType('')
            }
        }
    }

    const onChangeTime = (value, type, isInit) => {
        if (type === 'h') {
            isInit ? dispatch({payload: {type: 'initHour', value: value}}) : dispatch({payload: {type: 'endHour', value: value}})
        } else if (type === 'm') {
            isInit ? dispatch({payload: {type: 'initMin', value: value}}) : dispatch({payload: {type: 'endMin', value: value}})
        } else if (type === 's') {
            isInit ? dispatch({payload: {type: 'initSec', value: value}}) : dispatch({payload: {type: 'endSec', value: value}})
        }
    }

    const onClickRepetitionButtons = (btnNum) => {
        if (btnNum === 1) {
            dispatch({payload: {type: 'repetitionBtn1', value: !state.repetitionBtn1}})
            dispatch({payload: {type: 'repetitionBtn2', value: false}})
            dispatch({payload: {type: 'repetitionBtn3', value: false}})
            dispatch({payload: {type: 'weekDay', value: ''}})
        }
        else if (btnNum === 2) {
            dispatch({payload: {type: 'repetitionBtn2', value: !state.repetitionBtn2}})
            dispatch({payload: {type: 'repetitionBtn1', value: false}})
            dispatch({payload: {type: 'repetitionBtn3', value: false}})
        }
        else if (btnNum === 3) {
            dispatch({payload: {type: 'repetitionBtn3', value: !state.repetitionBtn3}})
            dispatch({payload: {type: 'repetitionBtn1', value: false}})
            dispatch({payload: {type: 'repetitionBtn2', value: false}})
            dispatch({payload: {type: 'weekDay', value: ''}})
        }
    }

    const onClickWeekDay = (day, num) => {
        dispatch({payload: {type: 'weekDay', value: day}})
        dispatch({payload: {type: 'weekDayNum', value: num}})
    }

    const displayWeek = (weekday) => {
        if(weekday === 'ش') return 'شنبه'
        else if(weekday === 'ی') return 'یکشنبه'
        else if(weekday === 'د') return 'دو شنبه'
        else if(weekday === 'س') return 'سه شنبه'
        else if(weekday === 'چ') return 'چهارشنبه'
        else if(weekday === 'پ') return 'پنج شنبه'
        else if(weekday === 'ج') return 'جمعه'
    }

    const submitIntervalData = () => {
        setShowInterval(false)
    }

    const submitUsersList = () => {
        setShowUsers(false)
    }

    const addUser = (id) => {
        let users = state.usersList;
        if (state.usersList.includes(id)) {
            const index = users.indexOf(id);
            if (index > -1) users.splice(index, 1);
        } else {
            users.push(id)
        }
        dispatch({payload: {type: 'usersList', value: users}})
    }


        // let fuck = moment(initValue);
        // fuck.set('hour', state.initHour); 
        // fuck.set('minute', state.initMin); 
        // fuck.set('second', state.initSec); 
        // console.log("fuck", fuck);
    
        // console.log('moment',moment(fuck).toISOString());

    const addEvent = () => {
        let start = moment(initValue);
        start.set('hour', state.initHour); 
        start.set('minute', state.initMin); 
        start.set('second', state.initSec ? state.initSec : '00'); 
        console.log("start", start);

        let end = moment(endValue);
        end.set('hour', state.endHour); 
        end.set('minute', state.endMin); 
        end.set('second', state.endSec ? state.endSec : '00'); 
        console.log("end", end);


        let data = {
            name: state.name,
            desc: state.desc ? state.desc : undefined,
            start: moment(start).toISOString(),
            end: moment(end).toISOString(),
            Collaborators: state.usersList,
            type: state.repetitionBtn1 ? 'fixed' : (state.repetitionBtn2 ? 'weekly' : 'monthly'),
            interval: state.repetitionBtn2 ? state.weekDayNum : initValue.date(),
            target: state.intervalBtn ? jaMoment.from(`14${state.year}/${state.month}/${state.day}`, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD') : undefined,
            notifyMe: true,
            Lab: labId,
            activity: state.activity
        }

        console.log("data", data);
        createEvent({...data})
            .then(res => {
                console.log("succcccc", res.data);
                getEvents();
            }).catch(err => {
                console.log("eeeeeeee" , err);
            }).finally(() => close())
    }




    const isEmpty = (data) => {
        return data.trim().length === 0
    }

    const checkSubmitIsDisable = () => {
        return (
            isEmpty(state.name) || isEmpty(state.initHour) || isEmpty(state.initMin) || isEmpty(state.endHour) || isEmpty(state.endMin) ||
            (state.repetitionBtn2 && isEmpty(state.weekDay)) || state.usersList.length === 0 || 
            (state.intervalBtn && (isEmpty(state.year) || isEmpty(state.month) || isEmpty(state.day)))            
        )
    }

    const onClickActivity = (activity) => {
        dispatch({payload: {type: 'activity', value: activity}})
    }

    return (
        <div className={cs(styles['container'])} onClick={(e) => onClickModal(e)}>
            <img src={infoIcon} alt='info icon'/>

            <div className={cs(styles['inputs'])}>
                <p> نوع المان </p>
                
                <div className={cs(styles['checkbox_wrapper'])}>
                    <div className={cs(styles['checkbox'])} onClick={() => onClickActivity('meeting')}>
                        <CheckBoxV2 checked={true} value={state.activity === 'meeting'}  onClick={() => onClickActivity('meeting')}/>
                        {text.input_10}
                    </div>
                    <div className={cs(styles['checkbox'])} onClick={() => onClickActivity('upload')}>
                        <CheckBoxV2 checked={true} value={state.activity === 'upload'}  onClick={() => onClickActivity('upload')}/>
                        {text.input_11}
                    </div>
                </div>

                <TextInputV2 
                    value={state.name}
                    onChange={(e)=>dispatch({payload: {type: 'name', value: e.target.value}})}
                    placeholder={text.input_1} 
                    dir={'rtl'}
                    opacity={'0.8'}
                    width={'255px'}
                    fontFamily={'pinar_light'}
                    fontWeight={'300'}
                    fontSize={'16px'}
                />

                <TextAreaV1 
                    name={'description'}
                    value={state.desc}
                    onChange={(e)=>dispatch({payload: {type: 'desc', value: e.target.value}})}
                    placeholder={text.input_2} 
                    rows={'6'}
                    opacity={'0.8'}
                    width={'363px'}
                    fontFamily={'pinar_light'}
                    fontWeight={'300'}
                    fontSize={'16px'}
                    resizable={false}
                />


            </div>
            
            <div className={cs(styles['time_warpper'])}>
                <img src={clockIcon} alt='clock icon'/>
                <div className={cs(styles['time_inputs'])}>
                    <div className={cs(styles['time_input'])}>
                        <p onClick={() => setType('init')}> {text.input_3} </p>
                        <p onClick={() => setType('init')}> {`${initDay} - ${initDate}`} </p>
                        <div className={cs(styles['time'])}>
                            <input 
                                placeholder='_'
                                value={state.initHour}
                                onChange={(e) => onChangeTime(e.target.value, 'h', true)}
                                style={{width: state.initHour ? '15px' : '12px'}}
                            />
                            :
                            <input 
                                placeholder='_'
                                value={state.initMin}
                                onChange={(e) => onChangeTime(e.target.value, 'm', true)}
                                style={{width: state.initHour ? '15px' : '12px'}}
                            />
                            :
                            <input 
                                placeholder='_'
                                value={state.initSec}
                                onChange={(e) => onChangeTime(e.target.value, 's', true)}
                                style={{width: state.initHour ? '15px' : '12px'}}
                            />
                        </div>
                        {
                            type === 'init' && (
                                <div className={cs(styles['datepicker_wrapper'])} id='#date-picker'>
                                    <CalendarProvider locale='fa' accentColor={colors['main-color-100']} direction='ltr' round="x2">
                                        <Calendar
                                            defaultValue={initValue}
                                            onChange={(day) => {setInitValue(moment(day)); setType('')}}
                                            weekends={[6]}
                                            className={cs(styles['datepicker'])}
                                        />
                                    </CalendarProvider>
                                </div>
                            )
                        }
                    </div>

                    <div className={cs(styles['time_input'])}>
                        <p onClick={() => setType('end')}> {text.input_4} </p>
                        <p onClick={() => setType('end')}> {`${endDay} - ${endDate}`} </p>
                        <div className={cs(styles['time'])}>
                            <input 
                                placeholder='_'
                                value={state.endHour}
                                onChange={(e) => onChangeTime(e.target.value, 'h', false)}
                                style={{width: state.endHour ? '15px' : '12px'}}
                            />
                            :
                            <input 
                                placeholder='_'
                                value={state.endMin}
                                onChange={(e) => onChangeTime(e.target.value, 'm', false)}
                                style={{width: state.endMin ? '15px' : '12px'}}
                            />
                            :
                            <input 
                                placeholder='_'
                                value={state.endSec}
                                onChange={(e) => onChangeTime(e.target.value, 's', false)}
                                style={{width: state.endSec ? '15px' : '12px'}}
                            />
                        </div>
                        {
                            type === 'end' && (
                                <div className={cs(styles['datepicker_wrapper'])} id='#date-picker'>
                                    <CalendarProvider locale='fa' accentColor={colors['main-color-100']} direction='ltr' round="x2">
                                        <Calendar
                                            defaultValue={endValue}
                                            onChange={(day) => {setEndValue(moment(day)); setType('')}}
                                            weekends={[6]}
                                            className={cs(styles['datepicker'])}
                                        />
                                    </CalendarProvider>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={cs(styles['repetition_inputs'])}>
                <div className={cs(styles['title'])} onClick={() =>  !showInterval && setShowInterval(true)} style={{cursor: showInterval ? 'default' : 'pointer' }}>
                    <img src={repeatIcon} alt='repeat icon' />
                    {
                        showInterval 
                            ? text.title_1 
                            : (
                                state.repetitionBtn1 
                                    ? text.input_5 
                                    : (
                                        <span>
                                            هر
                                            {state.repetitionBtn2 ? displayWeek(state.weekDay) : <span> ماه</span>}
                                            {state.intervalBtn ? <span>تا تاریخ {state.day} {month(state.month)} تکرار شود</span> : <span> تکرار شود </span> }
                                        </span> 
                                    )
                        )
                    }

                    {showInterval && 
                        <img src={tickIcon} onClick={() => submitIntervalData()} alt='tick icon' style={{cursor: !showInterval ? 'default' : 'pointer',position: 'absolute', left:'0px'}}/>
                    }
                </div>

                {
                    showInterval && (
                        <div className={cs(styles['checkboxes'])}>
                            <div className={cs(styles['checkbox_wrapper'])}>
                                <div className={cs(styles['checkbox'])} onClick={() => onClickRepetitionButtons(1)}>
                                    <CheckBoxV2 checked={true} value={state.repetitionBtn1}  onClick={() => onClickRepetitionButtons(1)}/>
                                    {text.input_5}
                                </div>
                            </div>
                            <div className={cs(styles['checkbox_wrapper'])}>
                                <div className={cs(styles['checkbox'])} onClick={() => onClickRepetitionButtons(2)}>
                                    <CheckBoxV2 checked={true} value={state.repetitionBtn2} onClick={() => onClickRepetitionButtons(2)}/>
                                    {text.input_6}
                                </div>
                                {
                                    state.repetitionBtn2 && (
                                        <div className={cs(styles['weekdays'])} >
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'ش' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('ش', 0)}>ش</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'ی' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('ی', 1)}>ی</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'د' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('د', 2)}>د</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'س' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('س', 3)}>س</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'چ' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('چ', 4)}>چ</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'پ' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('پ', 5)}>پ</div>
                                            <div className={cs(styles['weekday'])} style={{...(state.weekDay === 'ج' && {borderColor: colors['main-color-100'], color: colors['main-color-100']})}} onClick={() => onClickWeekDay('ج', 6)}>ج</div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className={cs(styles['checkbox_wrapper'])}>
                                <div className={cs(styles['checkbox'])} onClick={() => onClickRepetitionButtons(3)}>
                                    <CheckBoxV2 checked={true} value={state.repetitionBtn3} onClick={() => onClickRepetitionButtons(3)}/>
                                    {text.input_7}
                                </div>
                            </div>
        
                            <div className={cs(styles['interval_inputs'])}>
                                <p> {text.title_2} </p>

                                <div className={cs(styles['checkbox_wrapper'])}>
                                    <div className={cs(styles['checkbox'])} >
                                        <CheckBoxV2 checked={true} value={state.intervalBtn}  onClick={() => dispatch({payload: {type: 'intervalBtn', value: !state.intervalBtn}})}/>
                                        {
                                            state.intervalBtn
                                                ? 
                                                    <span className={cs(styles['date'])}>
                                                        <span style={{paddingLeft: '2px', minWidth: '35px'}}>تا تاریخ</span>
                                                        <div style={{direction:'ltr'}}>
                                                            <input 
                                                                placeholder='--'
                                                                value={state.year}
                                                                onChange={(e) => dispatch({payload: {type: 'year', value: e.target.value}})}
                                                            />
                                                            / 
                                                            <input 
                                                                placeholder='--'
                                                                value={state.month}
                                                                onChange={(e) => dispatch({payload: {type: 'month', value: e.target.value}})}
                                                            />
                                                            / 
                                                            <input 
                                                                placeholder='--'
                                                                value={state.day}
                                                                onChange={(e) => dispatch({payload: {type: 'day', value: e.target.value}})}
                                                            />
                                                        </div>
                                                    </span>
                                                : 
                                                    <p >{text.input_9}</p>
                                                
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                


                
            </div>

            <div className={cs(styles['users'])}>
                <div className={cs(styles['title'])} onClick={() =>  !showUsers && setShowUsers(true)} style={{cursor: showUsers ? 'default' : 'pointer' }}>
                    <img src={usersIcon} alt='users icon' />
                    <p> {text.title_3} </p>
                    {showUsers && 
                        <img src={tickIcon} onClick={() => submitUsersList()} alt='tick icon' style={{cursor: !showUsers ? 'default' : 'pointer',position: 'absolute', left:'0px'}}/>
                    }
                </div>

                {
                    showUsers && (
                        <div className={cs(styles['users_list'])}>
                            <div className={cs(styles['header'])}>
                                <p> {text.title_4} </p>
                                <img src={filterIcon} alt='filter icon'/>
                                <img src={sortIcon} alt='sort icon'/>
                            </div>
                            <div className={cs(styles['users_name'])}>
                                {
                                    students && students.map((student, ind) => 
                                        <div className={cs(styles['username'])} key={ind}>
                                            <CheckBoxV2 value={state.usersList.includes(student._id)} onClick={() => addUser(student._id)}/>
                                            <div className={cs(styles['data'])}>
                                                <p> {student?.firstName} {student?.lastName}</p>
                                                <p> {student?.type} </p>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                }
                
            </div>

            <div className={cs(styles['btn_container'])}>
                <Button
                    color={colors['dark-shades-100']} 
                    onClick={() => addEvent()}
                    text={text.button} 
                    width={'255px'}
                    disabled={checkSubmitIsDisable()}
                />
            </div>
        </div>
    )
}


// import { default as cs } from 'classnames'
// import Button from 'components/global/button'
// import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
// import { useEffect, useReducer } from 'react'
// import styles from './style.module.scss'
// import colors from "styles/colors.module.scss"
// import { text } from './constants'
// import TextAreaV1 from 'components/global/inputs/textareas/textareaV1'
// import { Calendar, CalendarProvider } from "zaman";
// import moment from 'moment';
// import 'moment/locale/fa';
// import infoIcon from 'assets/icons/essential/info-circle/light-color.svg';
// import clockIcon from 'assets/icons/time/clock/light-color.svg';
// import { useState } from 'react'
// import useInput from 'hooks/useInputHandler'
// import { useModal } from 'hooks/useModal'
// import { weekday } from 'utils/mapper'
// import { month } from 'utils/mapper'



// export default function AddEventModal({close, openCalendar, showCalendar, closeCalendar}) {


//     const { value: calendarValue, setValue: setCalendarValue } = useInput(moment());
//     const { value: initDay, setValue: setInitDay } = useInput('');
//     const { value: initDate, setValue: setInitDate } = useInput('');
//     const { value: endDay, setValue: setEndDay } = useInput('');
//     const { value: endDate, setValue: setEndDate } = useInput('');

//     useEffect(() => {
//         let todayDay = weekday(calendarValue.day());
//         let todayDate = `${calendarValue._d.toLocaleDateString('fa-IR').split('/')[2]}  ${month(calendarValue._d.toLocaleDateString('fa-IR').split('/')[1])} `;
//         setInitDay(todayDay);
//         setEndDay(todayDay);
//         setInitDate(todayDate);
//         setEndDate(todayDate);
//     }, [])


//     // console.log("calendarValue", calendarValue);
//     // console.log("to localllll", calendarValue.toLocaleDateString('fa-IR'));
    
//     const setCalendar = (day) => {
//         setCalendarValue(moment(day))
//     }

//     return (
//         <div className={cs(styles['container'])} onClick={() => openCalendar && closeCalendar() }>
//             <img src={infoIcon} alt='info icon'/>

//             <div className={cs(styles['inputs'])}>
//                 <TextInputV2 
//                     // value={state.email}
//                     // onChange={(e)=>dispatch({payload: {type: 'email', value: e.target.value}})}
//                     placeholder={text.input_1} 
//                     dir={'rtl'}
//                     opacity={'0.8'}
//                     width={'255px'}
//                     fontFamily={'pinar_light'}
//                     fontWeight={'300'}
//                     fontSize={'16px'}
//                 />

//                 <TextAreaV1 
//                     name={'description'}
//                     // value={state.desc}
//                     // onChange={(e)=>dispatch({payload: {type: 'desc', value: e.target.value}})}
//                     placeholder={text.input_2} 
//                     rows={'6'}
//                     opacity={'0.8'}
//                     width={'363px'}
//                     fontFamily={'pinar_light'}
//                     fontWeight={'300'}
//                     fontSize={'16px'}
//                     resizable={false}
//                 />


//             </div>
            
//             <div className={cs(styles['time'])}>
//                 <img src={clockIcon} alt='clock icon'/>
//                 <div className={cs(styles['time_inputs'])}>
//                     <div className={cs(styles['time_input'])}>
//                         <p> {text.input_3} </p>
//                         <p onClick={() => showCalendar()}> {`${initDay} - ${initDate}`} </p>
//                         {
//                             openCalendar && (
//                                 <div className={cs(styles['datepicker_wrapper'])}>
//                                     <CalendarProvider locale='fa' accentColor={colors['main-color-100']} direction='ltr' round="x2">
//                                         <Calendar
//                                             defaultValue={calendarValue}
//                                             onChange={(day) => setCalendar(day)}
//                                             weekends={[6]}
//                                             className={cs(styles['datepicker'])}
//                                         />
//                                     </CalendarProvider>
//                                 </div>
//                             )
//                         }
//                     </div>
//                     <div className={cs(styles['time_input'])}>
//                         <p> {text.input_4} </p>
//                         <div className={cs(styles['time_input'])}></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }