import {default as cs} from 'classnames'
import styles from './style.module.scss'



export default function Switch({left, right}) {
    return (
        <div className={cs(styles['btn-container'])}>
            <label className={cs(styles['btn-color-mode-switch'])}>
                <input value="1" id="color_mode" name="color_mode" type="checkbox"/>
                <label for="color_mode" className={cs(styles['btn-color-mode-switch-inner'], styles['btn-color-mode-switch'])} data-left={left} data-right={right}></label>
            </label>
        </div>
    )
}

