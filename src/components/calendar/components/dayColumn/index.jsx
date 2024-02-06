import { default as cs } from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';

export default function Column({now, index, events, showMore, setEvent}) {

    const date = now.clone().weekday(index)._d.toLocaleDateString('fa-IR')
    const today = moment();


    // events && events.map(e => {
    //     console.log("eeeeeee", e);
    //     console.log("name", e.name);
    //     console.log("start", e.start);
    //     console.log("moemnt", moment(e)._d);
    //     console.log("date/first day of week", date);
    //     console.log("now", now);
    //     console.log("----------------------------------------------------------------------------------------------");
    // })



    return (
        <div className={cs(styles['container'])}>
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


                        // if ((moment(e?.start)._d.toLocaleDateString('fa-IR') === today._d.toLocaleDateString('fa-IR')) && 
                        //     ( today._d.getTime() >= moment(e?.start)._d.getTime() && today._d.getTime() <= moment(e?.end)._d.getTime())) {
                        //     // console.log("ssss", moment(e?.start)._d);
                        //     // console.log("eeee", e);
                        //     // console.log("today._d", today._d.getTime());
                        //     // console.log(" moment(e?.start)._d",  moment(e?.start)._d.getTime());
                            
                        //     // console.log("t>s",   today._d >= moment(e?.start)._d );
                        //     console.log("moment(e?.start)._d.toLocaleDateString('fa-IR')",  moment(e?.start)._d.toLocaleDateString('fa-IR') );
                        //     console.log("today._d.toLocaleDateString('fa-IR')",  today._d.toLocaleDateString('fa-IR') );
                        //     console.log("===", moment(e?.start)._d.toLocaleDateString('fa-IR') === today._d.toLocaleDateString('fa-IR'), e.name);

                        //     // if ( today._d.getTime() >= moment(e?.start)._d.getTime() && today._d.getTime() <= moment(e?.end)._d.getTime()) {
                        //     //     console.log("nnnn", e.name);
                        //     // }
                        // }
                        // // if(true) {
                        // //     if (true) {
                        // //         // moment.duration(moment(e?.end))._data.hours >= 20



                        // //     // e.name === 'تستتتت' || e.name === '5شنبه'
                        // //     console.log("end", moment.duration(moment(e?.end))._data.hours );
                        // //     // console.log("start", moment.duration(moment(e?.start))._data.hours );
                        // //     // console.log("diffff", (moment.duration(moment(e?.end).diff(moment(e?.start)))));
                        // //     // console.log("diffff", (moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40);
                        // //     // console.log("moment", moment(e?.start)._d.toLocaleDateString('fa-IR'));
                        // //     console.log("e", e);
                        // //     // console.log("duuuur", moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours);
                        // //     }


                        // // }
                        return (
                            <>
                                <div 
                                    className={cs(styles['event'])} 
                                    onClick={() => {setEvent(e); showMore()}}
                                    key={i} 
                                    style={{
                                        ...(moment(e?.start)._d.toLocaleDateString('fa-IR') !== date && { display: 'none'}),
                                        ...(moment(e?.start).hour() !== 0 && { top: `${ (moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666)) }px`}),
                                        ...(moment(e?.end).hour() !== 0 && { 
                                            height:`${ 
                                                ((moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40)+(moment.duration(moment(e?.end).diff(moment(e?.start)))._data.minutes*0.6666)
                                            }px`
                                        }),
                                    }}
                                >
                                   <p>  {e?.name } </p>
                                </div>


                                {/* {
                                    
                                        <div 
                                            className={cs(styles['today_flag'])} 
                                            // style={{
                                            //     // ...((
                                            //     //     !(
                                            //     //         (moment(e?.start)._d.toLocaleDateString('fa-IR') === today._d.toLocaleDateString('fa-IR')) && 
                                            //     //         ( today._d.getTime() >= moment(e?.start)._d.getTime() && today._d.getTime() <= moment(e?.end)._d.getTime())
                                            //     //     )
                                            //     // ) && { display: 'none'}),
                                            //     // ...(
                                            //     //     // moment(e?.start).hour() !== 0 
                                            //     //    true && {top: '10px'}

                                                        && { top: `${(moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666))
                                                                    + (
                                                                        ((moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40)+
                                                                        (moment.duration(moment(e?.end).diff(moment(e?.start)))._data.minutes*0.6666)
                                                                    ) / 2
                                                        }px`}
                                            //     // ),
                                            // }}
                                        >
                                            <div className={cs(styles['circle'])} >a </div>
                                        </div>
                                } */}
                            </>
                        )
                    })
                }
 {/* + ( ((moment.duration(moment(e?.end).diff(moment(e?.start)))._data.hours)*40)+(moment.duration(moment(e?.end).diff(moment(e?.start)))._data.minutes*0.6666)) / 2 */}
                {
                    date === today._d.toLocaleDateString('fa-IR') && (
                        <div 
                            className={cs(styles['today_flag'])}
                            style={{
                                top: `
                                    ${(today.hour()*40)+(Math.ceil(today.minute()*0.5))
                                    }px`
                            }}
                        >
                            <div className={cs(styles['circle'])} />
                        </div>
                    )
                }

            </div>
        </div>
    )
}
