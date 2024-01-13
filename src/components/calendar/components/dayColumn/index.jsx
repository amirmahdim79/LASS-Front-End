import { default as cs } from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';

export default function Column({now, index, events}) {

    const date = now.clone().weekday(index)._d.toLocaleDateString('fa-IR')
    const today = moment();

    // console.log("dateeeeeeeee", date);
    // console.log("now.clone().weekday(index)._d.toLocaleDateString('fa-IR')", now.clone().weekday(index)._d.toLocaleDateString('fa-IR'));


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
                        if(true) {
                            // e.name === 'تستتتت' || e.name === '5شنبه'
                            // console.log("the cevet", e);
                            // console.log("moment", moment(e?.start)._d.toLocaleDateString('fa-IR'));
                            // console.log("date", date);
                            // console.log("duuuur", moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours);

                        }
                        return (
                            <>
                                <div 
                                    className={cs(styles['event'])} 
                                    key={i} 
                                    style={{
                                        ...(moment(e?.start)._d.toLocaleDateString('fa-IR') !== date && { display: 'none'}),
                                        ...(moment(e?.start).hour() !== 0 && { top: `${ (moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666)) }px`}),
                                        ...(moment(e?.end).hour() !== 0 && { 
                                            height:`${ ((moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40)+(moment.duration(moment(e?.end).diff(moment(e?.start)))._data.minutes*0.6666)}px`
                                        }),
                                    }}
                                >
                                    {e?.name }
                                </div>
                                {
                                    date === today._d.toLocaleDateString('fa-IR') && 
                                        <div 
                                            className={cs(styles['today_flag'])} 
                                            style={{
                                                ...(moment(e?.start)._d.toLocaleDateString('fa-IR') !== date && { display: 'none'}),
                                                ...(
                                                    moment(e?.start).hour() !== 0 
                                                        && { 
                                                            top: `${ 
                                                                    (moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666))
                                                                    + (
                                                                        ((moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40)+
                                                                        (moment.duration(moment(e?.end).diff(moment(e?.start)))._data.minutes*0.6666)
                                                                    ) / 2
                                                        }px`}
                                                ),
                                            }}
                                        >
                                            <div className={cs(styles['circle'])} />
                                        </div>
                                }
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}
