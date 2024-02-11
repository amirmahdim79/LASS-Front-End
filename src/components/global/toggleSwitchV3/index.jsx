import {default as cs} from 'classnames'
import styles from './style.module.scss'

export default function SwitchV3({
    value,
    onClick,
    valueName_r,
    valueName_m,
    valueName_l,
    title_r,
    title_m,
    title_l,
    stageWidth = '90px',
}) {


    return (
        <div className={cs(styles['btn_container'])}>
            <p style={{width: stageWidth}} id={valueName_r} name={valueName_r} className={cs(value === valueName_r && styles['is_active'])} onClick={() => onClick(valueName_r)}> {title_r} </p>
            <p style={{width: stageWidth}} id={valueName_m} name={valueName_m} className={cs(value === valueName_m && styles['is_active'])} onClick={() => onClick(valueName_m)}> {title_m} </p>
            <p style={{width: stageWidth}} id={valueName_l} name={valueName_l} className={cs(value === valueName_l && styles['is_active'])} onClick={() => onClick(valueName_l)}> {title_l} </p>
        </div>
    )
}

