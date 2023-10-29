import styles from './style.module.scss'
import {default as cs} from 'classnames'
import colors from "styles/colors.module.scss"


export default function TextAreaV1({
    cols,
    defaultValue ,
    dir = 'rtl' ,
    disabled = false ,
    errorMessage = '',
    fontSize = '20px' ,
    fontWeight = '400',
    inputLabel = '' ,
    inputRef ,
    isValid = true ,
    name,
    onChange = ()=>{} , 
    opacity = '1',
    placeholder = '' ,
    rows,
    showError = false,
    value ,
    width = '100%' ,
}) {
    return (
        <div className={cs(styles['container'])}>
                {inputLabel && <label for={name} style={{fontWeight: fontWeight}}> {inputLabel} </label>}

                <textarea 
                    id={name} 
                    name={name} 
                    rows={rows && rows} 
                    cols={cols && cols}
                    dir={dir}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    ref={inputRef}
                    style={{width:width, opacity:opacity, fontSize:fontSize, height:'100%'}}
                >
                    {value}
                </textarea>

            {(!isValid && showError) && <p className={cs(styles['container'])}>{errorMessage}</p>}
        </div>
    )
}