import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import icon from "assets/icons/checkmark/success.svg"


export default function CheckBoxV1({
    checked = false, 
    width = '20px', 
    height = '20px',
}) {

    return (
        <div 
            className={cs(styles['container'])} 
            style={{width: width, height: height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}
        >
            <input type="checkbox" defaultChecked={checked} />
            <span className={cs(styles['checkmark'])} style={{...(checked && {borderColor: colors['success-100']}) }}>
                {
                    checked && 
                        <img 
                            src={icon}
                            alt='icon'
                        />
                }
            </span>
        </div>
    )
}

