import { default as cs } from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import { weekday } from 'utils/mapper';

export default function Column({today, index, events}) {

    const date = today.clone().weekday(index)._d.toLocaleDateString('fa-IR').split("/")[2]

    console.log("date",date);


    // events.map(e => {
    //     console.log("eeeeeeeeee", e);
    //     // console.log("e?.start",  e?.start);
    //     // console.log("moment",  moment(e?.start));
    //     // console.log("day",  moment(e?.start).day());
    //     // console.log("date",  moment(e?.start).date());
    //     console.log("dddd",  moment(e?.start)._d);
    //     console.log("horrrrrrrrrrr",  moment(e?.start).minute());
    // })

    return (
        <div className={cs(styles['container'])}>
            {/* <div className={cs(styles['header'])} style={{ ...(index === 0 && {borderBottom:'none'})}}>
                <p className={cs(styles['day'])}> {weekday(index)} </p>
                <p className={cs(styles['date'])}> {date} </p>

                {
                    index === 0 &&  <hr className={cs(styles['header_line'])}/>
                }               
            </div> */}

            <div className={cs(styles['body'])}>
                { Array.from(Array(24), (e, i) => {
                        return (
                            <div className={cs(styles['cell'])} key={i}>
                                {/* {
                                    index === 0 && 
                                        <div className={cs(styles['time'])} >
                                            <p> {i+1} </p>
                                        </div>
                                } */}
                            
                            </div>
                        )
                    })
                }


                {
                    events && events.map((e, i) => {
                        return (
                            <div 
                                className={cs(styles['event'])} 
                                key={i} 
                                style={{
                                    ...(moment(e?.start)._d.toLocaleDateString('fa-IR').split("/")[2] !== date && { display: 'none'}),
                                    ...(moment(e?.start).hour() !== 0 && { top: `${ (moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666)) }px`})

                                }}
                            >
                                {e?.name }

                                {
                                    date === today._d.toLocaleDateString('fa-IR').split("/")[2] && 
                                        <div className={cs(styles['today_flag'])} >
                                            <div className={cs(styles['circle'])} >

                                            </div>
                                        </div>
                                }

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
