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
import ShowEventDataModal from './components/showEventDataModal';
import { useCreateEventActions } from './components/addModal/hooks/useCreateEventActions';
import DeleteModal from './components/deleteModal';


export default function Calendar({events, date, setDate, getEvents}) {

    const { value: num, setValue: setNum } = useInput(0);
    const { value: calendar, setValue: setCalendar } = useInput('');
    const { value: event, setValue: setEvent } = useInput({});
    const permissions = useSelector(state => state.user.permissions);
    const labId = useSelector(state => state.lab.labId);

    const [ openAddEventModal, showAddEventModal, closeAddEventModal ] = useModal();
    const [ openShowMoreModal, showShowMoreModal, closeShowMoreModal ] = useModal();
    const [ openDeleteModal, showDeleteModal, closeDeleteModal ] = useModal();

    const { deleteEvent, deletingEvent} = useCreateEventActions();


    const goNextWeek = () => {
        let value = num;
        value += 1;
        setNum(value);
        setDate(moment(date).weekday(+1*7))
    }

    const goPrevWeek = () => {
        let value = num;
        value -= 1;

        setNum(value);
        setDate(moment(date).weekday(-1*7))
    }

    const goNextMonth = () => {
        let jalaliDate = toEnDigit(date._d?.toLocaleDateString('fa-IR'));
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
        let jalaliDate = toEnDigit(date._d?.toLocaleDateString('fa-IR'));
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

    const showMore = () => {
        showShowMoreModal();
    }

    const removeEvent = () => {
        deleteEvent({Event: event._id})
            .then(() => getEvents(labId))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                closeDeleteModal();
                closeShowMoreModal();
            })
    }

    return (
        <div className={cs(styles['container'])}>
            {
                date &&
                    <>
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
                                <p> {month(date._d?.toLocaleDateString('fa-IR').split("/")[1])} </p>
                                
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
                                        <div 
                                            className={cs(styles['header_data'], 
                                                date.clone().weekday(i)._d?.toLocaleDateString('fa-IR').split("/")[1] !== date._d?.toLocaleDateString('fa-IR').split("/")[1] && styles['disabled_header_data']
                                            )} 
                                        >
                                            <div className={cs(styles['header_border'])}/>
                                            <p className={cs(styles['day'])}> {weekday(i)} </p>
                                            <p className={cs(styles['date'])}> 
                                                {date.clone().weekday(i)._d?.toLocaleDateString('fa-IR').split("/")[2]} 
                                            </p>

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
                                            showMore={showMore}
                                            setEvent={setEvent}
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

                            {
                                openShowMoreModal && (
                                    <Modal
                                        isOpen={openShowMoreModal} 
                                        close={closeShowMoreModal} 
                                        content={
                                            <div className={cs(styles['show_event_modal'])} style={{display: openShowMoreModal ? 'block' : 'none'}} id='#events_modal'>
                                                <ShowEventDataModal event={event} showDeleteModal={showDeleteModal}/>
                                            </div>
                                        }
                                    />
                                )
                            }

                            {
                                openDeleteModal && (
                                    <Modal
                                        isOpen={openDeleteModal} 
                                        close={closeDeleteModal} 
                                        content={
                                            <div className={cs(styles['delete_modal'])} style={{display: openDeleteModal ? 'block' : 'none'}} >
                                                <DeleteModal
                                                    onCancel={closeDeleteModal}
                                                    onSubmit={removeEvent}
                                                    submitLoad={deletingEvent}
                                                    data={event.name}
                                                />
                                            </div>
                                        }
                                    />
                                )
                            }

                        </div>
                    </>
            }
        </div>
    )
}