import {default as cs} from 'classnames'
import { useEffect, useState } from 'react';
import styles from './style.module.scss'



export default function Switch({
    left, 
    right,
    setValue
}) {

    const label2 = document.getElementById("color_mode");
    const [type, setType] = useState('')

    useEffect(() => {
        setValue(type)
    }, [type])

    const handleClick = () => {
        if (label2?.checked) setType(right);
        else setType(left);
    }


    return (
        <div className={cs(styles['btn-container'])} onClick={() => handleClick()}>
            <label className={cs(styles['btn-color-mode-switch'])} >
                <input id="color_mode" name="color_mode" type="checkbox"/>
                <label for="color_mode" className={cs(styles['btn-color-mode-switch-inner'], styles['btn-color-mode-switch'])} data-left={left} data-right={right} />
            </label>
        </div>
    )
}

