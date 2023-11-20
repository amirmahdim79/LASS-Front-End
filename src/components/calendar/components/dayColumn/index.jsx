import { default as cs } from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import { weekday } from 'utils/mapper';

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
                        return (
                            <div 
                                className={cs(styles['event'])} 
                                key={i} 
                                style={{
                                    ...(moment(e?.start)._d.toLocaleDateString('fa-IR') !== date && { display: 'none'}),
                                    ...(moment(e?.start).hour() !== 0 && { top: `${ (moment(e?.start).hour()*40)+(Math.ceil(moment(e?.start).minute()*0.6666)) }px`})

                                }}
                            >
                                {e?.name }
                                {moment(e?.start).hour()}

                                {
                                    date === today._d.toLocaleDateString('fa-IR') && 
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
