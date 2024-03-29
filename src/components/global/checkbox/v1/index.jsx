import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import icon from "assets/icons/checkmark/success.svg"


export default function CheckBoxV1({
    checked = false, 
    width = '20px', 
    height = '20px',
    value,
    onClick,
    name = 'name',
    id = 'id',
    clickable = true,
}) {

    return (
        <div 
            className={cs(styles['container'], clickable && styles['clickable'])} 
            style={{width: width, height: height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}
        >
            <input type="checkbox" value={value} name={name} id={id}/>
            <span className={cs(styles['checkmark'])} style={{...(checked && {borderColor: colors['success-100']})}} onClick={onClick}>
                {
                    value && 
                        <img 
                            src={icon}
                            alt='icon'
                        />
                }
            </span>
        </div>
    )
}

