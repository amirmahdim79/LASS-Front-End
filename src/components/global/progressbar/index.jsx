import {default as cs} from 'classnames'
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import styles from './style.module.scss'



export default function LinearProgressBar({width, height, progress, color}) {  

    const { value: progressValue, setValue: setProgressValue } = useInput(0);

    useEffect(() => {
        setProgressValue(progress)
    }, [progress])

    return (
        <div className={cs(styles['container'])} style={{width: width, height: height}}>
            <div className={cs(styles['progress_bar'])} style={{backgroundColor: color, width: `${progressValue}%`}}/>
        </div>
    )
}

