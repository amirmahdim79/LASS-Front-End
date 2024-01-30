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

export default function Task() {

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const constantText = text[params.type]

    const { getUserTask, completeReadingPapers } = useTasksActions();
    const { value: task, setValue: setTask } = useInput({});
    const { value: done, setValue: setDone } = useInput(false);

    // console.log("task", task);


    const getTaskData = () => {
        getUserTask({}, `/${params.id}`)
            .then(res => {
                setTask(res.data)
            }).catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        if (params.id && location.pathname.includes('usertask')) getTaskData();
    }, [params.id, location.pathname])


    const onClickCompleteTask = () => {
        if (!task.status) {
            completeReadingPapers({UserTask: params.id})
                .then(res => {
                    console.log("---------rrrr", res.data);
                    getTaskData();
                })
                .catch(err => {
                    console.log("erreeeeeeeeeeeeeeeeeee", err)
                })
        }
    }


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['chart_container'])}>
                <p className={cs(styles['title'])}> {constantText.chart.title} </p>

                {/* { params.type === 'upload' && <p className={cs(styles['subtitle'])}> تعداد گزارش‌کارهای تحویل شده در هفته گذشته </p> }
                { params.type === 'paper' && <span className={cs(styles['subtitle'])}> تعداد مقالات مطالعه شده با هشتگ <span>  {'E-Learning#'} </span> در هفته گذشته!</span> }

                <img  src={chartImg} alt='chart' />

                { params.type === 'upload' && <span className={cs(styles['info'])}> استریک آپلود به موقع گزارش کار شما <span>  {'7'} </span> دفعه می‌باشد </span> } */}
            </div>

            <div className={cs(styles['task_container'])}>
                <p className={cs(styles['title'])}> {task.name} </p>

                <div className={cs(styles['date_wrapper'])}>
                    <span> {constantText.date} :</span>
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
                                    btnText={constantText.btn}
                                />
                            </div>

                        </div>
                }

                {
                    params.type === 'paper' && 
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

                                <CheckBoxV1 width={'30px'} height={'30px'} value={task.status} onClick={() => onClickCompleteTask()} />
                            </div>                            
                        </div>
                }

            </div>
        </div>
    )

}