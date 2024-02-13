import { default as cs } from 'classnames'
import styles from './style.module.scss'
import moment from 'moment';
import 'moment/locale/fa';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { getTime } from 'utils/mapper';

export default function Column({now, index, events, showMore, setEvent}) {

    const { value: today, setValue: setToday } = useInput('');
    const { value: date, setValue: setDate } = useInput('');


    useEffect(() => {
        getTime(setToday);
        setDate(now.clone().weekday(index)._d.toLocaleDateString('fa-IR'))
    }, [])
;


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['body'])} > 
                { Array.from(Array(24), (e, i) => {
                        return (
                            <div className={cs(styles['cell'])} key={`cell-${i}${index}`}  />
                        )
                    })
                }

                {
                    events && events.map((e, i) => {
                        return (
                            <div 
                                className={cs(styles['event'])} 
                                onClick={() => {setEvent(e); showMore()}}
                                key={`event-${i}${index}`}  
                                style={{
                                    ...(moment(e?.start)._d?.toLocaleDateString('fa-IR') !== date && { display: 'none'}),
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
                        )
                    })
                }
                {
                    date === today._d?.toLocaleDateString('fa-IR') && (
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
