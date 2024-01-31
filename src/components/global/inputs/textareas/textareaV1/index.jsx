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
    fontFamily = '',
    inputLabel = '' ,
    inputRef ,
    isValid = true ,
    name,
    onChange = ()=>{} , 
    placeholder = '' ,
    rows,
    showError = false,
    value ,
    width = '100%' ,
    resizable = true,
}) {
    return (
        <div className={cs(styles['container'])} style={{width: `calc(${width} + 10px)`, ...(fontFamily ? {fontFamily: fontFamily} : {fontFamily: 'pinar_reg'}),}}>
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
                    style={{width:width, fontSize:fontSize, fontFamily: fontFamily, fontWeight: fontWeight, height:'100%', ...(!resizable && {resize:'none'})}}
                >
                    {value}
                </textarea>

            {(!isValid && showError) && <p className={cs(styles['container'])}>{errorMessage}</p>}
        </div>
    )
}