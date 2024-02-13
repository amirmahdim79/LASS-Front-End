import { default as cs } from 'classnames'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import DataContainer from './components'
import arrowRight from "assets/icons/arrow/arrow-right-accent.svg"
import arrowLeft from "assets/icons/arrow/arrow-left-accent.svg"


export default function ProgressTracker({milestones, currentMilestone}) {

    const prevId = useSelector(state => state.lab.prevId);


    const [width, setWidth] = useState(0)

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

    }, [milestones, currentMilestone])

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
                {milestones && milestones.length && milestones.map((m,i) => 
                    <DataContainer 
                        name={m.name} 
                        tasks={m?.Tasks} 
                        isLast={i === milestones.length-1} 
                        milestoneStatus={m.status[0]}
                        width={width}
                        prevId={prevId}
                        currInd={i}
                        key={i}

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

