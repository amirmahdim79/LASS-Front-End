import { default as cs } from 'classnames'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useEffect } from 'react'
import styles from './style.module.scss'
import checkmarkDark from "assets/icons/checkmark/dark-shades.svg"
import checkmarkLight from "assets/icons/checkmark/light-shades.svg"
import useInput from 'hooks/useInputHandler'

export default function DataContainer({name, isLast=false, tasks=[], width='20%', milestoneStatus, prevId, currInd}) {

    const { value: hasCompletedTask, setValue: setHasCompletedTask } = useInput(false);

    useEffect(() => {
        for (const t of tasks) {
            if (t.status[0]) {
                setHasCompletedTask(true)
                break;
            }
    }
    }, [tasks])

    return (
        
        <div className={cs(styles['progress_data_container'])} style={{...(isLast && {width:'max-content', minWidth:'unset'})}} key={currInd}>
            {
                !isLast && 
                    <>
                        <div className={cs(styles['step_line'])}>
                            <div className={cs(styles['line_filled'])} style={{...(prevId === currInd ? {width: width} : (prevId > currInd || milestoneStatus?.status ? {width: '100%'} : {width: '0%'}))}}></div>
                        </div>
                        { currInd === 0 &&  <div className={cs(styles['first_line'])} /> }
                    </>
            }
            { isLast && <div className={cs(styles['last_line'])} /> }


            <div className={cs(styles['step_data'])}>
                <div 
                    className={cs( milestoneStatus?.status ? styles['completed_step_circle'] : styles['step_circle'])} 
                >
                    {
                        milestoneStatus?.status
                            ? <img 
                                src={checkmarkLight}
                                alt='checkmark'
                                className={cs(styles['checkmark_icon'])}
                            /> 
                            : (
                                hasCompletedTask
                                    ? <p> {width} </p>
                                    : <img 
                                        src={checkmarkDark}
                                        alt='checkmark'
                                        className={cs(styles['checkmark_icon'])}
                                    />  
                            )
                    }
                </div>
                <div className={cs(styles['data_container'])}>
                    <p className={cs(styles['milestone_name'])}> {name} </p>
                    <div className={cs(styles['tasks'])}>
                        {
                            tasks.map((task, i) => 
                                <div className={cs(styles['task_data'])} key={i}>
                                    <CheckBoxV1 value={task?.status[0]?.status} clickable={false}/>
                                    <p> {task.name} </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}