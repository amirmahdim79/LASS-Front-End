
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import infoIcon from 'assets/icons/essential/info-circle/light-color.svg';
import clockIcon from 'assets/icons/time/clock/light-color.svg';
import usersIcon from 'assets/icons/users/people/light-color.svg';
import moment from 'moment'
import jaMoment from 'jalali-moment'
import { weekday } from 'utils/mapper';
import { month } from 'utils/mapper';
export default function ShowEventDataModal({event}) {

    let startDate =  moment(jaMoment.from(event.start, 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
    let endDate =  moment(jaMoment.from(event.end, 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))

    return (
        <div className={cs(styles['container'])} >
            <div className={cs(styles['info_container'])}>
                <img src={infoIcon} alt='info icon'/>
                <div className={cs(styles['info'])}>
                    <p>{'نام رویداد:' + '\xa0\xa0' + event.name} </p>
                    <p>{'نام المان:' + '\xa0\xa0' + (event.activity === 'meeting' ? 'جلسه' : 'گزارش')} </p>
                    <p>{'توضیحات:' + '\xa0\xa0' + (event?.desc ? event?.desc : 'ندارد')} </p>
                </div>
            </div>
            <div className={cs(styles['time_container'])}>
               <div className={cs(styles['interval_container'])}>
                    <img src={clockIcon} alt='clock icon'/>
                    {/* <p>{'تکرار:' + '\xa0\xa0' + (event?.type === 'fixed' ? 'تکرار نمی شود' : `هر ${weekday(event.interval)} تکرار می شود `)} </p> */}
                    {/* <p>{'تکرار:'} </p> */}
                    
               </div>
                <div className={cs(styles['time'])}>
                    <p>{'زمان شروع:' + '\xa0\xa0' + weekday(startDate.weekday()) + '-' + startDate._i.split('/')[2] + month(startDate._i.split('/')[1])} </p>
                    <p>{'زمان پایان:' + '\xa0\xa0' + weekday(endDate.weekday()) + '-' + endDate._i.split('/')[2] + month(endDate._i.split('/')[1])} </p>
                </div>
            </div>
            <div className={cs(styles['users_container'])}>
                <div className={cs(styles['users_title'])}>
                    <img src={usersIcon} alt='users icon'/>
                    <p>{'مدعوین:'} </p>
                </div>
                <div className={cs(styles['users_list'])}>
                    {
                        event?.Collaborators && event?.Collaborators.map((c, i) => 
                            <div className={cs(styles['user'])} key={i}>
                                <p>{c.firstName} {c.lastName}</p> 
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}