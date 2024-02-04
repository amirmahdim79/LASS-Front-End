import {default as cs} from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { month } from 'utils/mapper';
import jaMoment from 'jalali-moment'
import { weekday } from 'utils/mapper';
import { toEnDigit } from 'utils/mapper';
import { monthNumber } from 'utils/mapper';
import Activity from './components/activity';
import { useLocation } from 'react-router-dom';


export default function ActivitiesTable() {  

    moment.locale('fa');

    const today = moment();
    const location = useLocation();  


    const { value: recentMonthsArr, setValue: setRecentMonthsArr } = useInput([]);
    const { value: monthDays, setValue: setMonthDays } = useInput([]);
    const { value: totalActivities, setValue: setTotalActivities } = useInput(0);
    const { value: firstMonthStartWeekDay, setValue: setFirstMonthStartWeekDay } = useInput(0);

    const getRecentMonths = () => {
        let monthsArr = [];
        monthsArr.push(month(moment(jaMoment.from(moment(), 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).subtract(2, "month").month() + 1))
        monthsArr.push(month(moment(jaMoment.from(moment(), 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).subtract(1, "month").month() + 1))
        monthsArr.push(month(moment(jaMoment.from(moment(), 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).month() + 1))
        setRecentMonthsArr(monthsArr)
    }

    const getMonthDays = () => {
        let monthDaysNum = [];
        let totalDaysNum = 0;
        let jalaliDate = toEnDigit(moment()._d.toLocaleDateString('fa-IR'));
        let jalaliYear = jalaliDate.split('/')[0];
        let nextDataMonth = month(moment(jaMoment.from(moment(), 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')).add(1, "month").month() + 1)

        let firstMonthFirstDate = jaMoment.from(`${jalaliYear}/${monthNumber(recentMonthsArr[0])}/01`, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD').replace(/\//g, '-');
        let secondMonthFirstDate = jaMoment.from(`${jalaliYear}/${monthNumber(recentMonthsArr[1])}/01`, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD').replace(/\//g, '-');
        let thirdMonthFirstDate = jaMoment.from(`${jalaliYear}/${monthNumber(recentMonthsArr[2])}/01`, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD').replace(/\//g, '-');
        let fourthMonthFirstDate = jaMoment.from(`${jalaliYear}/${monthNumber(nextDataMonth)}/01`, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD').replace(/\//g, '-');
        setFirstMonthStartWeekDay(moment(firstMonthFirstDate).weekday())

        let firstDate =  moment(firstMonthFirstDate);
        let secondDate =  moment(secondMonthFirstDate);
        let thirdDate =  moment(thirdMonthFirstDate);
        let fourthDate =  moment(fourthMonthFirstDate);

        monthDaysNum.push(secondDate.diff(firstDate, 'days'));
        monthDaysNum.push(thirdDate.diff(secondDate, 'days'));
        monthDaysNum.push(fourthDate.diff(thirdDate, 'days'));
        setMonthDays(monthDaysNum);

        totalDaysNum += monthDaysNum[0] + monthDaysNum[1] + monthDaysNum[2];
        setTotalActivities(totalDaysNum);
    }


    useEffect(() => {
        console.log("268");
        getRecentMonths();
    }, [location.pathname])

    useEffect(() => {
        getMonthDays();
    }, [recentMonthsArr])

    // let jalaliDate = toEnDigit(moment()._d.toLocaleDateString('fa-IR'));
    // console.log("monthDays", recentMonthsArr);
    // // console.log("momendaysInMonth()", moment("2012-02", "YYYY-MM").daysInMonth());
    // // console.log("today()", moment());
    // console.log("azar 1", (jaMoment.from('1402/5/01', 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')));  //2023/11/22
    // console.log("dey 1", (jaMoment.from('1402/10/01', 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')));   //2023/12/22
    // console.log("bahman 1", (jaMoment.from('1402/11/01', 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')));   //2024/01/21
    // console.log("esf 1", (jaMoment.from('1402/12/01', 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')));  // 2024/02/20
    // console.log("far 1", (jaMoment.from('1403/01/01', 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')));  // 2024/03/20
    // // console.log("today()", moment().subtract(1, "month").daysInMonth());


    // var a = moment([2023, 11, 22]);
    // var b = moment([2023, 11, 25]);

    // const dateB = moment('2023-11-22');
    // const dateC = moment('2023-12-22');
    // const dateD = moment('2024-01-21');
    // const dateE = moment('2024-02-20');
    // const dateF = moment('2024-03-20');

    // console.log("/////////////////", '2023/01/22'.replace(/\//g, '-'));

    // console.log(`Difference is ${dateF.diff(dateE, 'days')}`);


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['activitiy_container'])}>
                <div className={cs(styles['month_container'])} 
                    style={{width: `calc(${(Math.ceil(totalActivities/7) * 25) + (10 * (Math.ceil(totalActivities/7) - 1))+ (firstMonthStartWeekDay !== 0 && 35)}px)`, marginLeft: '60px'}}
                >
                    {recentMonthsArr.map((m, i) => 
                        <p key={i}> {m} </p>    
                    )}
                </div>
                <div className={cs(styles['dates_container'])}>
                    <div className={cs(styles['weekdays'])}>
                        { Array.from(Array(7), (e, i) => {
                            return (
                                <p> {weekday(i)} </p>
                            )}) 
                        }
                    </div>
                    <div 
                        className={cs(styles['activities'])} 
                        style={{width: `calc(${(Math.ceil(totalActivities/7) * 25) + (10 * (Math.ceil(totalActivities/7) - 1)) + (firstMonthStartWeekDay !== 0 && 35)}px)`}}
                    >
                    {/* <div className={cs(styles['activities'])} > */}
                        {totalActivities && Array.from(Array(totalActivities), (e, i) => {
                            return (
                                <>
                                    {i === 0  && 
                                        Array.from(Array(firstMonthStartWeekDay), (e, i) => {
                                            return (
                                                <Activity isHidden={true}/>
                                            )}) 
                                        
                                    }
                                    <Activity 
                                        dayNum={i+1 <= monthDays[0] ? i+1 : (i+1 - monthDays[0] <= monthDays[1] ? i+1 - monthDays[0] : i+1 - monthDays[0] - monthDays[1])}
                                        monthValue={i+1 <= monthDays[0] ? recentMonthsArr[0] : (i+1 - monthDays[0] <= monthDays[1] ? recentMonthsArr[1] : recentMonthsArr[2])}
                                        // weekNum={}
                                    />
                                </>
                            )}) 
                        }
                    </div>

                </div>
            </div>



            <div className={cs(styles['table_info'])}>
                <p> کمتر </p>
                <div className={cs(styles['activity'], styles['activity_0'])}/>
                <div className={cs(styles['activity'], styles['activity_1'])}/>
                <div className={cs(styles['activity'], styles['activity_2'])}/>
                <div className={cs(styles['activity'], styles['activity_3'])}/>
                <p> بیشتر </p>
            </div>

        </div>
    )
}