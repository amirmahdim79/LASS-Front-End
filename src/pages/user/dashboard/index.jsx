import { default as cs } from 'classnames'
import styles from './dashboard.module.scss'
import ProgressTracker from 'components/progressTracker';
import TaskStatusBar from 'components/dashboardTaskStatus';
import taskIcon from 'assets/icons/clipboard-text.svg'
import Pagination from 'components/global/pagination';
import useInput from 'hooks/useInputHandler';
import { truncateText } from 'utils/mapper';
import { text } from './constants';
import { useEffect, useState } from 'react';
import { useLabActions } from './hooks/useLabsActions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setPath, setMilestone, setCurrentMilestone, setPrevInd } from "store/labSlice/index"
import Preloader from 'components/global/preloaders';
import text_preloader from 'assets/gifs/text_preloader.gif'


export default function UserDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const title = 'عنوان فاز';

    const path = useSelector(state => state.lab.Paths);
    const milestones = useSelector(state => state.lab.Milestones);
    const currentMilestone = useSelector(state => state.lab.CurrentMilestone);

    const tasks = [
        {
            id: '1',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/05/06 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status:'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'وابسته به زمان نیست',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'تاخیر در ارائه',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'وابسته به زمان نیست',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
        {
            id: '2',
            title: 'گزارش',
            status: 'نزدیک مهلت انجام',
            deadline: '1402/06/30 - 16:00',
            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز',
        },
    ]

    const { getMyLabs } = useLabActions();


    useEffect(() => {
        getMyLabs().then(res => {
            dispatch(setPath(res.data.Paths[0]))
            dispatch(setMilestone(res.data.Paths[0].Milestones))

            // for(let [i, milestone] of res.data.Paths[0].Milestones){
            //     console.log(".........milestone", milestone);
            //     if (milestone.status[0] === null) {
            //         dispatch(setCurrentMilestone(milestone))
            //       break;
            //     }
            // }

            for (const [i, milestone] of res.data.Paths[0].Milestones.entries()) {
                    if (milestone.status[0] === null) {
                        dispatch(setCurrentMilestone(milestone))
                        if (i === 0) dispatch(setPrevInd(0))
                        else dispatch(setPrevInd(i-1))
                        break;
                    }
            }

        }).catch(err => {
            console.log("...........eeeeeoeeeeeeeeeee", err);
        })
    }, [])

    console.log("currentMilestone", currentMilestone);

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['step_progress_container'])}>
                {
                    path?.name
                        ? <h5> {text.t1.title} - {`[${path?.name}]`}</h5>
                        : 
                            <div className={cs(styles['title_container'])}>
                                <h5> {text.t1.title} - </h5>
                                <span> 
                                    {'['} 
                                    <img
                                        src={text_preloader}
                                        alt='loading'
                                    />
                                    {']'} 
                                </span>
                            </div>
                }
                
                { milestones 
                    ? <ProgressTracker/> 
                    : <Preloader />
                }
               
            </div>

            <div className={cs(styles['upcoming_activities_container'])}>
                <div className={cs(styles['title'])}>
                    <div> {text.t2.title} </div>
                    <div> {text.t2.deadline} </div>
                </div>
                <div className={cs(styles['activities'])}>
                    {
                        currentMilestone
                            ? 
                                currentMilestone?.Tasks.map((task, index) => {
                                    return (
                                        <div className={cs(styles['activity-box'])} key={index} onClick={() => navigate(`../task/${task._id}/${task.activity === 'upload' ? 'upload' : 'reading'}`)}>
                                            <div className={cs(styles['activity-data'])}>
                                                <div className={cs(styles['right-column'])}> 
                                                    <div className={cs(styles['icon'])}>
                                                        <img src={taskIcon} alt='icon'/>
                                                    </div>
                                                    <p className={cs(styles['activity-title'])}> {task.name} </p>
                                                    {task?.type && <TaskStatusBar type={task?.type}/>}                                            
                                                </div>
        
                                                <div className={cs(styles['activity-deadline'])}> {task?.type === 'fixed' ? '-' : 'نداریم فهلا'} </div>
                                            </div>
                                            <p className={cs(styles['activity-text'])}> {task.desc} </p>
                                        </div>
                                    )
                                })
                            :
                                <Preloader />
                    }
                </div>

                <div>
                    {/* <Pagination /> */}
                </div>
            </div>
        </div>

    )
}

