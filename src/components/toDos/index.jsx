import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import tickIcon from 'assets/icons/essential/tick-circle/light-color.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import colors from "styles/colors.module.scss"
import moment from 'moment';
import 'moment/locale/fa';
import { waitingTimeColorDecider } from 'utils/mapper'

export default function ToDos() {

    const today = moment();

    const navigate = useNavigate();
    const tasks = useSelector(state => state.lab.supsTasks);

    // const colorDecider = (time) => {
    //     let diff = moment.duration(moment(time).diff(moment(today)));

    //     if (diff._data.years !== 0) {
    //         return {
    //             text: `${Math.abs(diff._data.years)} سال`,
    //             color: `${colors['error-100']}`
    //         }
    //     } else if (diff._data.months !== 0) {
    //         return {
    //             text: `${Math.abs(diff._data.months)} ماه`,
    //             color: `${colors['error-100']}`
    //         }
    //     } else if (diff._data.days !== 0) {
    //         let ms = Math.abs(diff._milliseconds)
    //         return {
    //             text: `${Math.abs(diff._data.days)} روز`,
    //             color: `${ ms >= 604800000 ? `${colors['error-100']}` : ( ms >= 172800000 ?  `${colors['warning-dark-100']}` : `${colors['success-100']}`)}`
    //         }
    //     } else if (diff._data.hours !== 0) {
    //         return {
    //             text: `${Math.abs(diff._data.hours)} ساعت`,
    //             color: `${colors['success-100']}`
    //         }
    //     } else if (diff._data.minutes !== 0) {
    //         return {
    //             text: `${Math.abs(diff._data.minutes)} دقیقه`,
    //             color: `${colors['success-100']}`
    //         }
    //     } else if (diff._data.seconds !== 0) {
    //         return {
    //             text: `${Math.abs(diff._data.seconds)} ثانیه`,
    //             color: `${colors['success-100']}`
    //         }
    //     }
    // }

    // console.log("tasks", tasks);


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}> 
                <h2> {text.title} </h2> 
                <div className={cs(styles['icons'])}>
                    <img 
                        src={filterIcon}
                        alt='filter icon'
                        className={cs(styles['icon'])}
                    />
                    <img 
                        src={sortIcon}
                        alt='sort icon'
                        className={cs(styles['icon'])}
                    />
                </div>  
            </div> 

            <div className={cs(styles['tasks_list'])}> 
                <div className={cs(styles['list_header'])}> 
                    <p> {text.header} </p>
                </div>
                <div className={cs(styles['list_body'])}> 
                    { tasks && tasks.map((t, i) => 

                        <div className={cs(styles['list_item'])} key={i} onClick={() => navigate(`../approve-milsetone/${t._id}`)}>  
                            <div className={cs(styles['icon'])}> 
                                <img 
                                    src={tickIcon}
                                    alt='tick icon'
                                />
                            </div>

                            <div className={cs(styles['user_info'])}> 
                                <p> {t.name} </p>
                                <p> {`برای ${t?.User?.firstName} ${t?.User?.lastName}`} </p>
                            </div>

                            <div className={cs(styles['task_time'])} style={{color: waitingTimeColorDecider(t.createdAt).color}}> 
                                {waitingTimeColorDecider(t.createdAt).text}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}