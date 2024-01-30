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
import { setPath, setMilestone, setCurrentMilestone, setPrevInd, setEvents, setLabId, setStudents, setUserTasks } from "store/labSlice/index"
import Preloader from 'components/global/preloaders';
import Calendar from 'components/calendar';
import moment from 'moment';
import 'moment/locale/fa';
import TaskPreview from './components';

export default function UserDashboard() {

    moment.locale('fa');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const title = 'عنوان فاز';

    const path = useSelector(state => state.lab.Paths);
    const milestones = useSelector(state => state.lab.Milestones);
    const currentMilestone = useSelector(state => state.lab.CurrentMilestone);
    const userTasks = useSelector(state => state.lab.userTasks);
    const events = useSelector(state => state.lab.Events);
    const labId = useSelector(state => state.lab.labId);

    const { value: now, setValue: setNow } = useInput(moment());




    // let firstday = moment().month(1);
    // console.log("currentMilestone?.Tasks", currentMilestone?.Tasks);
    // console.log("userTasks", userTasks);



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

    const { getMyLabs, getLabEvents, getUserTasks } = useLabActions();

    const getEvents= (labId) => {
        getLabEvents({'date': `${now.month()+1}/${now.date()}/${now.year()}`}, `/${labId}`)
        .then(res => {
            // console.log("gettttt successs", res.data);
            dispatch(setEvents(res.data))})
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getMyLabs().then(res => {
            dispatch(setPath(res.data.Paths[0]))
            dispatch(setMilestone(res.data.Paths[0].Milestones))
            dispatch(setStudents(res.data.Students))
            dispatch(setLabId(res.data._id))
            // 'all': 'true'

            getEvents(res.data._id)

            for (const [i, milestone] of res.data.Paths[0].Milestones.entries()) {
                    if (milestone.status[0] === null) {
                        dispatch(setCurrentMilestone(milestone))
                        if (i === 0) dispatch(setPrevInd(0))
                        else dispatch(setPrevInd(i-1))
                        break;
                    }
            }

            getUserTasks()
                .then(res => {
                    dispatch(setUserTasks(res.data))
                })
                .catch(err => console.log(err))

        }).catch(err => {
            console.log(err);
        })

    }, [now])



    return (
        <div className={cs(styles['container'])}>
            <Calendar events={events} date={now} setDate={setNow} getEvents={getEvents}/>

            <div className={cs(styles['upcoming_activities_container'])}>
                <div className={cs(styles['title'])}>
                    <div> {text.t2.title} </div>
                    <div> {text.t2.deadline} </div>
                </div>
                <div className={cs(styles['activities'])}>
                    {
                        currentMilestone
                            ? 
                               <>
                                    {currentMilestone?.Tasks.map((task, index) => <TaskPreview task={task} key={index}/>)}
                                    {userTasks.map((task, index) => <TaskPreview task={task} type={'usertask'} key={index}/>) }
                               </>
                            : <Preloader />
                    }
                </div>

                <div>
                    {/* <Pagination /> */}
                </div>
            </div>
        </div>

    )
}

