import { default as cs } from 'classnames'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import CheckBoxV1 from 'components/global/checkbox/v1'
import download from "assets/icons/contents/download/main-color.svg"
import { useSelector } from 'react-redux'
import DataContainer from './components'
import arrowRight from "assets/icons/arrow/arrow-right-accent.svg"
import arrowLeft from "assets/icons/arrow/arrow-left-accent.svg"


export default function ProgressTracker({milestones}) {

    const currentMilestone = useSelector(state => state.lab.CurrentMilestone);
    const prevId = useSelector(state => state.lab.prevId);

    // console.log("currentMilestone", currentMilestone);
    // console.log("paths[0].Milestones", paths[0]?.Milestones);

    const steps = [
        {
            label: 'عنوان مایلستون',
            step: 1,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 2,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                    hasFile: true,
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                    hasFile: true,
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 3,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 4,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 5,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 6,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
    ]

    const [activeStep, setActiveStep] = useState(0)
    const [width, setWidth] = useState(0)
    // const totalSteps = steps.length

    console.log("milestones", milestones);


    useEffect(() => {
        if (currentMilestone) {
            let sum = 0;
            let total = currentMilestone.Tasks.length;
            for(let task of currentMilestone.Tasks){
                if (task.status[0] !== null) sum += 1;
                else continue
            }
            setWidth(`${Math.ceil( 100 * sum / total)}%`)
        }

    }, [currentMilestone])

    // console.log("currentMilestone", currentMilestone);
    // console.log("width", width);

    // const width = `${(100 / (milestones.length - 1)) * (activeStep - 1)}%`

    // useEffect(() => {
    //     let sum = 0;
    //     let completed = 0; 
    //     paths[0]?.Milestones.map((m,i) => {
    //         sum += m.Tasks.length
    //         if(i <= activeStep) completed += m.Tasks.length;
    //     })
    //     setTotal(sum)
    //     setActiveStep(completed)

    // }, [paths])

    // width={currentMilestone._id === m._id ? }


    // const checkMilesoneStatus = (milestone) => {
    //     console.log("milestone", milestone);
    // }

    // useEffect(() => {
    //     checkMilesoneStatus()
    // }, [])

    const leftScroll = () => {
        const left = document.getElementById('#steps_container')
        left.scrollBy({
            top: 10,
            left: -left.offsetWidth,
            behavior: "smooth",
          });
    }

    
    const rightScroll = () => {
        const right = document.getElementById('#steps_container')
        right.scrollBy({
            top: 10,
            left: right.offsetWidth,
            behavior: "smooth",
          });
    }

    return (

        <div className={cs(styles['main_container'])}>
            {
                milestones && milestones.length > 3 &&
                    <button className={cs(styles['arrow_left'])} onClick={leftScroll}>
                        <img 
                            src={arrowLeft}
                            alt='left arrow'
                            className={cs(styles['arrow_icon'])}
                        />
                    </button>
            }

            <div className={cs(styles['steps_container'])} id='#steps_container'>
                
                {milestones && milestones.map((m,i) => 
                    <DataContainer 
                        name={m.name} 
                        tasks={m?.Tasks} 
                        isLast={i === milestones.length-1} 
                        milestoneStatus={m.status[0]}
                        width={width}
                        prevId={prevId}
                        currInd={i}

                    />
                )}

            </div>

            {
                milestones && milestones.length > 3 &&
                    <button className={cs(styles['arrow_right'])} onClick={rightScroll}>
                        <img 
                            src={arrowRight}
                            alt='right arrow'
                            className={cs(styles['arrow_icon'])}
                        />
                    </button>
            }

        </div>

    )
}

