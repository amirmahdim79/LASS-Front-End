import {default as cs} from 'classnames'
import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"


export default function SwitchV2({
    setValue,
    value,
    onClick,
    name = 'name',
    id = 'id',
    isDark = true,
}) {

    const toggleInput = document.getElementById(id);
    // const [value, setValue] = useState(false)


    // const handleClick = () => {
    //     if (toggleInput?.checked) setValue(true);
    //     else setValue(false);
    // }

    // const onClick = () => {
    //     console.log('value', value);
    //     if (value) setValue(false);
    //     else setValue(true);
    // }


    return (
        <div className={cs(styles['btn_container'])} >
            <label className={cs(styles['switch'])} >
                <input type="checkbox" id={id} name={name} className={cs(value && styles['checked_input'])} value={value} onClick={onClick}/>
                <span className={cs(styles['slider'])} style={{...(!isDark && {backgroundColor: colors['light-glass-100']})}} for={name} />
            </label>
        </div>
    )
}

