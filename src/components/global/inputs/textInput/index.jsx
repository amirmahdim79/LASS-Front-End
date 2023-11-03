import styles from './style.module.scss'
import {default as cs} from 'classnames'
import colors from "styles/colors.module.scss"


export default function TextInput({
    color,
    defaultValue ,
    dir = 'ltr' ,
    disabled = false ,
    errorMessage = '',
    fontSize = '20px' ,
    fontWeight = '400',
    height = '48px' ,
    inputLabel = '' ,
    inputRef ,
    isValid = true ,
    labelDirection = 'rtl' ,
    onChange = ()=>{} , 
    placeholder = '' ,
    required = false ,
    showError = false,
    type = 'text',
    value ,
    width = '100%' ,
}) {
    return (
        <div 
            className={cs(styles['container'])} 
            style={{height: height, ...((!isValid && showError) ? {borderBottom:`1px solid ${colors['error-100']}`} : {borderBottom:`1px solid ${colors['dark-shades-100']}`})}}>
            <div 
                className={cs(styles['input_container'])} 
                style={{...(labelDirection === 'ltr' && {gridTemplateColumns: 'auto 1fr'})}}
            >
                <div 
                    className={cs(styles['label_container'])} 
                    style={{...(labelDirection === 'ltr' && {gridArea:'unset'})}}
                >
                    <p className={cs(styles['label'])} style={{fontSize: fontSize, fontWeight: fontWeight}}> {inputLabel} </p>
                </div>
                <input 
                    defaultValue={defaultValue}
                    dir={(type==='email'|| type==='number' || type==='password') ? 'ltr' : dir} 
                    disabled={disabled}
                    onChange={onChange} 
                    placeholder={placeholder}
                    ref={inputRef}
                    required={required}
                    style={{width:width, height:height, fontSize:fontSize, fontWeight: fontWeight, color: color}}
                    type={type}
                    value={value} 
                    // style={{fontFamily: }}
                />
            </div>
            {(!isValid && showError) && <p className={cs(styles['container'])}>{errorMessage}</p>}
        </div>
    )
}