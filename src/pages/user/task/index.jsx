import { default as cs } from 'classnames'
import { useLocation, useParams } from 'react-router-dom';
import { text } from './constants';
import colors from "styles/colors.module.scss"
import styles from './task.module.scss'
import chartImg from 'assets/chart.svg';
import UploadReport from 'components/uploadReport';
import Button from 'components/global/button';
import CheckBoxV1 from 'components/global/checkbox/v1';
import { useEffect } from 'react';
import { useTasksActions } from './hooks/useTasksActions';
import useInput from 'hooks/useInputHandler';
import moment from 'moment'
import jaMoment from 'jalali-moment'
import ColoredString from 'components/global/coloredText';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Task() {

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const constantText = text[params.type]

    const labId = useSelector(state => state.lab.labId);

    const { getUserTask, completeReadingPapers, completeReadingMilestonPaperTask, getMilestoneTask, getBountyTask } = useTasksActions();
    const { value: task, setValue: setTask } = useInput({});
    const { value: done, setValue: setDone } = useInput(false);

    // console.log("--task",task);


    const getTaskData = () => {
        getUserTask({}, `/${params.id}`)
            .then(res => setTask(res.data))
            .catch(err => console.log(err))
    }

    const getMilestoneTaskData = () => {
        getMilestoneTask({}, `?id=${params.id}`)
            .then(res => setTask(res.data.Task))
            .catch(err =>console.log(err))
    }

    const getBountyTaskData = () => {
        getBountyTask({}, `?lab=${labId}&id=${params.id}`)
        .then(res => setTask(res.data))
        .catch(err =>console.log(err))
    }


    useEffect(() => {
        if (params.id && location.pathname.includes('usertask')) getTaskData();
        else if (params.id && location.pathname.includes('milestone-task')) getMilestoneTaskData();
        else if (params.id && location.pathname.includes('task-bounty') && labId) getBountyTaskData();
    }, [params.id, location.pathname, labId])


    const onClickCompleteTask = () => {
        if (!task.status) {
            if (location.pathname.includes('milestone-task')) {
                completeReadingMilestonPaperTask({Task: params.id})
                    .then(res => {
                        getTaskData();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else if (location.pathname.includes('usertask')){
                completeReadingPapers({UserTask: params.id})
                    .then(res => {
                        getTaskData();
                    })
                    .catch(err => {
                        console.log( err)
                    })
            } else if (location.pathname.includes('task-bounty')){
                // completeReadingPapers({UserTask: params.id})
                //     .then(res => {
                //         getTaskData();
                //     })
                //     .catch(err => {
                //         console.log( err)
                //     })
            }
        }
    }


    return (
        <div className={cs(styles['container'])}>
            {/* <div className={cs(styles['chart_container'])}>
                <p className={cs(styles['title'])}> {location.pathname.includes('/user/task-bounty') ? 'tasktasktask' : constantText.chart.title} </p>
            </div> */}

            <div className={cs(styles['task_container'])}>
                <p className={cs(styles['title'])}> {task.name} {(location.pathname.includes('task-bounty') ? task.status==='done' : task.status) && <span> (انجام شده است) </span>} </p>

                <div className={cs(styles['date_wrapper'])}>
                    <span> {text.date} :</span>
                    <span className={cs(styles['date'])}> {task?.dueDate ? moment(jaMoment.from(task.dueDate, 'en', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))._i : '-'} </span>
                </div>

                {
                    params.type === 'upload' && 
                        <div className={cs(styles['upload_container'])}>

                            <p className={cs(styles['subtitle'])}> {task?.desc} </p>
                            <div className={cs(styles['upload_wrapper'])}>
                                <UploadReport 
                                    text={'برای آپلود فایل کلیک کنید یا فایل را بر روی مستطیل بکشید'}
                                    info={'فرمت‌های قابل قبول عبارتند از: pdf، docx'}
                                    btnText={text.btn}
                                    type={location.pathname.includes('milestone-task') ? 'milestone-task' : 'usertask'}
                                    disabled={task.status}
                                />
                            </div>

                        </div>
                }

                {
                    (params.type === 'paper' || params.type === 'complete') && 
                        <div className={cs(styles['reading_articles_container'])}>
                            <div className={cs(styles['desc_container'])}>
                                {/* <span className={cs(styles['desc'])}> پس از مطالعه {'10'}  مقاله با هشتگ <span>  {'E-Learning#'} </span> چک‌باکس را پر کنید. </span> */}
                                <ColoredString 
                                    text={task?.desc} 
                                    delimiter={'**'} 
                                    color={colors['main-color-100']}
                                    clickableWord={true}
                                    onClickColoredWord={(word) => navigate(`../articles-database/?search=${word.trim()}`)}
                                />

                                <CheckBoxV1 width={'30px'} height={'30px'} value={location.pathname.includes('task-bounty') ? task.status === 'done' : task.status} onClick={() => onClickCompleteTask()} />
                            </div>                            
                        </div>
                }

            </div>
        </div>
    )

}