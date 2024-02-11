import {default as cs} from 'classnames'
import Button from 'components/global/button'
import { text } from './constants'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"

export default function DeleteModal({onCancel, onSubmit, submitLoad=false}) {
    return (
        <div className={cs(styles['container'])}>
            <p> {text.title} </p>
            <div className={cs(styles['buttons'])}>
                <Button
                    color={colors['light-shades-100']} 
                    onClick={() => onSubmit()}
                    text={text.button_1} 
                    outlined={true}
                    load={submitLoad}
                />
                <Button
                    color={colors['error-100']} 
                    onClick={() => onCancel()}
                    text={text.button_2} 
                    outlined={true}
                />
            </div>
        </div>  
    )
}