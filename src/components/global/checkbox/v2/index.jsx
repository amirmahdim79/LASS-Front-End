import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import icon from "assets/icons/checkmark/success.svg"


export default function CheckBoxV2({
    checked = false, 
    width = '20px', 
    height = '20px',
    value,
    onClick,

}) {


    return (
        // <div 
        //     className={cs(styles['container'])} 
        //     style={{width: width, height: height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}
        // >
        //     <input type="checkbox" defaultChecked={checked} />
        //     <span className={cs(styles['checkmark'])} style={{...(checked && {borderColor: colors['success-100']}) }}>
        //         {
        //             checked && 
        //                 <img 
        //                     src={icon}
        //                     alt='icon'
        //                 />
        //         }
        //     </span>
        // </div>
        // display: value ? 'block' : 'none',
        // width: '0px', height: '0px'
        <div 
            className={cs(styles['container'])} 
            style={{width: width, height: height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}
        >
            <input type="checkbox" defaultChecked={checked} value={value} />
            <span className={cs(styles['checkmark'])} onClick={onClick}>
                <div className={cs(styles['checkmark_value'])} style={{ ...(!value && {scale: 0})}}  />
            </span>
        </div>
    )
}

