import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import leftArrow from 'assets/icons/arrow/arrow-left-dark-color.svg'
import rightArrow from 'assets/icons/arrow/arrow-right-dark-color.svg'
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import useInput from 'hooks/useInputHandler';
import Column from './components/dayColumn';
import { weekday } from 'utils/mapper';
import { month } from 'utils/mapper';
import { toEnDigit } from 'utils/mapper';
import jaMoment from 'jalali-moment'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import Modal from 'components/global/modal';
import AddEventModal from './components/addModal';


export default function Calendar({events, date, setDate, getEvents}) {


    const navigate = useNavigate();

    const { value: num, setValue: setNum } = useInput(0);
    const { value: calendar, setValue: setCalendar } = useInput('');
    const permissions = useSelector(state => state.user.permissions);

    const [ openAddEventModal, showAddEventModal, closeAddEventModal ] = useModal();
    const [ openCalendar, showCalendar, closeCalendar ] = useModal();



    const goNextWeek = () => {
        let value = num;
        value += 1;
        setNum(value);
        setDate(moment(date).day(1*7))
        // setDate(moment().day(value*7))
    }

    const goPrevWeek = () => {
        let value = num;
        value -= 1;
        setNum(value);
        setDate(moment(date).day(-1*7))
        // setDate(moment().day(value*7))
        // console.log("moment().day(10)", moment().week(7));
    }

    const goNextMonth = () => {
        let jalaliDate = toEnDigit(date._d.toLocaleDateString('fa-IR'));
        let newJalaliDate = '';
        let month = jalaliDate.split('/')[1];
        if(month === '12') {
            let year = jalaliDate.split('/')[0];
            year = Number(year) + 1;
            newJalaliDate = `${year}/01/01`

        }else {
            month = Number(month) + 1;
            month = month >= '10' ? `${month}` : `0${month}`
            newJalaliDate = `${jalaliDate.split('/')[0]}/${month}/01`
        }
        setDate(moment(jaMoment.from(newJalaliDate, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')))
    }

    const goPrevMonth = () => {
        let jalaliDate = toEnDigit(date._d.toLocaleDateString('fa-IR'));
        let newJalaliDate = '';
        let month = jalaliDate.split('/')[1];
        if(month === '1') {
            let year = jalaliDate.split('/')[0];
            year = Number(year) - 1;
            newJalaliDate = `${year}/12/01`

        }else {
            month = Number(month) - 1;
            month = month >= '10' ? `${month}` : `0${month}`
            newJalaliDate = `${jalaliDate.split('/')[0]}/${month}/01`
        }
        setDate(moment(jaMoment.from(newJalaliDate, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')))
    }

    const addEvent = () => {
        showAddEventModal();
    }

    const closeEventsModal = () => {
        if(calendar) setCalendar('')
        else closeAddEventModal()
    }


    // let firstday = today.clone().weekday(0)._d.toLocaleDateString('fa-IR');
    // let lastday = today.clone().weekday(6)._d.toLocaleDateString('fa-IR');

    // console.log("today", today._d.toLocaleDateString('fa-IR'));
    // console.log("today._d", today._d);
    // console.log("today._d.toLocaleDateString('fa-IR')", today._d.toLocaleDateString('fa-IR'));
    // console.log("today", today);
    // console.log("today._d", today._d.toLocaleDateString('fa-IR'));



    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <div className={cs(styles['title_container'])}>
                    <p> {text.title} </p>
                    {
                        ( localStorage.getItem('type') === 'supervisor' || permissions.includes('events') ) && 
                            <div className={cs(styles['add_icon_container'])}>
                                <img 
                                    src={addIcon}
                                    alt='add icon'
                                    onClick={() => addEvent()}
                                />

                                <Modal
                                    isOpen={openAddEventModal} 
                                    close={closeEventsModal} 
                                    content={
                                        <div className={cs(styles['add_event_modal'])} style={{display: openAddEventModal ? 'block' : 'none'}} id='#users_modal'>
                                            <AddEventModal 
                                                close={closeAddEventModal} 
                                                type={calendar}
                                                setType={setCalendar}
                                                getEvents={getEvents}
                                            />
                                        </div>
                                    }
                                />
                            </div>
                    }                
                </div>
                <div  className={cs(styles['month'])}> 
                    <p> {month(date._d.toLocaleDateString('fa-IR').split("/")[1])} </p>
                    
                    <img
                        src={rightArrow}
                        alt='right arrow'
                        onClick={() => goNextMonth()}
                    />
                    <img
                        src={leftArrow}
                        alt='left arrow'
                        onClick={() => goPrevMonth()}
                    />
                </div>
            </div>
            <div className={cs(styles['content'])}>

                <div className={cs(styles['header_wrapper'])}>

                    <img
                        src={leftArrow}
                        className={cs(styles['left_arrow'])}
                        alt='left arrow'
                        onClick={() => goPrevWeek()}
                    />

                    <img
                        src={rightArrow}
                        className={cs(styles['right_arrow'])}
                        alt='right arrow'
                        onClick={() => goNextWeek()}
                    />

                    { Array.from(Array(7), (e, i) => {
                        return (
                            <div className={cs(styles['header_data'])} >
                                <div className={cs(styles['header_border'])}/>
                                <p className={cs(styles['day'])}> {weekday(i)} </p>
                                <p className={cs(styles['date'])}> {date.clone().weekday(i)._d.toLocaleDateString('fa-IR').split("/")[2]} </p>

                                {
                                    i === 0 &&  <hr className={cs(styles['header_line'])}/>
                                }               
                            </div>
                        )}) 
                    }
                </div>

                <div className={cs(styles['body'])}>
                    { Array.from(Array(7), (e, i) => {
                        return (
                            <Column 
                                now={date}
                                events={events}
                                key={i} 
                                index={i}
                            />
                        )}) 
                    }

                    <div className={cs(styles['time_wrapper'])}>
                        { Array.from(Array(24), (e, i) => {
                                return (
                                    <div className={cs(styles['time'])} key={i}>
                                        <p> {i+1} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                

                

                {/* { Array.from(Array(7), (e, i) => {
                    return (
                        <Column 
                            today={today}
                            events={events}
                            key={i} 
                            index={i}
                        />
                    )}) 
                } */}

            </div>
        </div>
    )
}