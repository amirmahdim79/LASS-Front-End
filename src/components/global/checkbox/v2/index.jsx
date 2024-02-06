import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import icon from "assets/icons/checkmark/success.svg"


export default function CheckBoxV2({
    width = '20px', 
    height = '20px',
    bgColor = 'transparent',
    // border
    value,
    onClick,
    name = 'name',
    id = 'id',
    borderColor = 'light',

}) {


    return (
        <div 
            className={cs(styles['container'])} 
            style={{width: width, height: height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}
        >
            <input type="checkbox"  value={value} name={name} id={id}/>
            <span className={cs(styles['checkmark'])} style={{backgroundColor: bgColor, ...(borderColor === 'dark' && {borderColor: colors['dark-shades-60']})}} onClick={onClick}>
                <div className={cs(styles['checkmark_value'])} style={{ ...(!value && {scale: 0})}}  />
            </span>
        </div>
    )
}

