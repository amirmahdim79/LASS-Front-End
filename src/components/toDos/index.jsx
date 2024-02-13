import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import tickIcon from 'assets/icons/essential/tick-circle/light-color.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { waitingTimeColorDecider } from 'utils/mapper'
import Preloader from 'components/global/preloaders'
import emptyList from 'assets/icons/contents/task-square/dark-color.svg'

export default function ToDos({loading}) {

    const navigate = useNavigate();
    const tasks = useSelector(state => state.lab.supsTasks);

    return (
        <div className={cs(styles['container'])} >
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
                {/* <div className={cs(styles['list_body'])} style={{...(!tasks.length && {maxHeight: '315px', minHeight: '315px', justifyContent: 'center' })}}>  */}
                <div className={cs(styles['list_body'])} style={{...(!tasks.length && {maxHeight: '315px', minHeight: '315px', justifyContent: 'center' })}}> 
                    { 
                    
                        loading  
                            ? <Preloader />
                            : (
                                tasks && !tasks.length 
                                    ? 
                                        <div className={cs(styles['empty_tasks'])}> 
                                            <img src={emptyList} alt='no activities exists'/>
                                            <p> {text.empty_tasks_list} </p>
                                        </div>
                                    : (
                                        tasks.map((t, i) => 
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
                                        )
                                    )
                                )  
                    }
                </div>
            </div>
        </div>
    )
}