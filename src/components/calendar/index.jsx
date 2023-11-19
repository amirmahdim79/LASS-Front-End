import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import leftArrow from 'assets/icons/arrow/arrow-left-dark-color.svg'
import rightArrow from 'assets/icons/arrow/arrow-right-dark-color.svg'
import useInput from 'hooks/useInputHandler';
import Column from './components/dayColumn';
import { weekday } from 'utils/mapper';
import { month } from 'utils/mapper';




function HeaderCell({day, today}) {

    return (
        <div className={cs(styles['headerCell'])}>
            <p className={cs(styles['day'])}> {weekday(day)} </p>
            <p className={cs(styles['date'])}> {today.clone().weekday(day)._d.toLocaleDateString('fa-IR').split("/")[2]} </p>
        </div>
    )
}

export default function UserCalendar({events}) {
    moment.locale('fa');
    // console.log("events", events);

    // let today2 = new Date();
    // let first2 = today2.getDate() - today2.getDay(); 
    // let last = first2 + 6; 

    // var firstday = new Date(today2.setDate(first2)).toUTCString();
    // var lastday = new Date(today2.setDate(last)).toUTCString();

    // console.log("today2", today2);
    // console.log("firstday", firstday);
    // console.log("lastday", lastday);

    // const today = moment();
    // const localToday = today.locale('fa');
    
    // // let first = today.date() - today.day(); 
    // // const from_date = today.startOf('week');
    // // const to_date = today.endOf('week');

    // // console.log("today", today);
    // // console.log("first", first);
    // // console.log("from_date", from_date);
    // console.log("localToday", localToday);



    const today = moment();

    let firstday = today.clone().weekday(0)._d.toLocaleDateString('fa-IR');
    let lastday = today.clone().weekday(6)._d.toLocaleDateString('fa-IR');

    console.log("today", today._d.toLocaleDateString('fa-IR'));
    // console.log("today._d", today._d);
    // console.log("today._d.toLocaleDateString('fa-IR')", today._d.toLocaleDateString('fa-IR'));
    // console.log("today", today);
    // console.log("today._d", today._d.toLocaleDateString('fa-IR'));



    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <p> {text.title} </p>
                <div> 
                    <p> {month(today._d.toLocaleDateString('fa-IR').split("/")[1])} </p>
                    
                    <img
                        src={rightArrow}
                        alt='right arrow'
                    />
                    <img
                        src={leftArrow}
                        alt='left arrow'
                    />
                </div>
            </div>
            <div className={cs(styles['content'])}>

                <div className={cs(styles['header_wrapper'])}>
                    { Array.from(Array(7), (e, i) => {
                        return (
                            <div className={cs(styles['header_data'])} >
                                <div className={cs(styles['header_border'])}/>
                                <p className={cs(styles['day'])}> {weekday(i)} </p>
                                <p className={cs(styles['date'])}> {today.clone().weekday(i)._d.toLocaleDateString('fa-IR').split("/")[2]} </p>

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
                                today={today}
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