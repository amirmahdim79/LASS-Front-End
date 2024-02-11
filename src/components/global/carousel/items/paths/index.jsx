import {default as cs} from 'classnames'
import { useState } from 'react'
import styles from './style.module.scss'
import routingIcon from 'assets/icons/location/routing/light-color.svg'
import docIcon from 'assets/icons/contents/document-normal/light-color.svg'
import docTextIcon from 'assets/icons/contents/document-text/light-color.svg'
import moreIcon from 'assets/icons/essential/more/dark-color.svg'

export default function CarouselItem({item}) {
    return (
        <div className={cs(styles['container'])}>
            <p> {item?.name} </p>
            <div className={cs(styles['milestones_container'])}>
                {
                    item.Milestones && item.Milestones.map((milestone,i) => 
                        <div className={cs(styles['milestones'])} key={i}>
                            <div className={cs(styles['title_container'])}>
                                <img 
                                    src={routingIcon}
                                    alt='routing icon'
                                    className={cs(styles['icon'], styles['milestone_icon'])}
                                    // onClick={() => openAddModal(i, 'milestone')}
                                />
                                <p> {milestone?.name} </p>

                            </div>
                            <div className={cs(styles['tasks_container'])}>
                                {
                                    milestone.Tasks.map((task,i) => 
                                        <div className={cs(styles['task'])} key={i}>
                                            <img 
                                                src={task.activity === 'upload' ? docIcon : docTextIcon}
                                                alt='task icon'
                                                className={cs(styles['icon'], task.activity === 'upload' ? styles['upload_icon'] : styles['paper_icon'])}
                                                // onClick={() => openAddModal(tInd, t.type)}
                                            />
                                            <p> {task?.name} </p>
                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    )
                }
            </div>
            
            <div className={cs(styles['more_icon_container'])}>
                <img  src={moreIcon} alt='more icon' />
            </div>

        </div>
    )
}