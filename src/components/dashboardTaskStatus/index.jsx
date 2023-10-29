import { default as cs } from 'classnames'
import { text } from './constants';
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';


export default function TaskStatusBar({type}) {

    const { value: status, setValue: setStatus } = useInput('');

    const colorDecider = (type) => {

        if (type === 'fixed') {
            return {
                'background-color': colors['success-60'],
                'color': colors['dark-shades-100']
            }
        }else {
            return {
                'background-color': colors['warning-60'],
                'color': colors['dark-shades-100']
            }
        }
        // if (type === text.status_1) {
        //     return {
        //         'background-color': colors['error-60'],
        //         'color': colors['light-shades-100']
        //     }
        // } else if (type === text.status_2) {
        //     return {
        //         'background-color': colors['warning-60'],
        //         'color': colors['dark-shades-100']
        //     }
        // } else if (type === text.status_3) {
        //     return {
        //         'background-color': colors['success-60'],
        //         'color': colors['dark-shades-100']
        //     }
        // }
    }

    useEffect(() => {
        if (type === 'fixed') setStatus(text.status_3)
        else  setStatus('فغلا ننداریمممم')
    }, [type])


    return (
        <div className={cs(styles['container'])} style={colorDecider(type)}>
           {status}
        </div>

    )
}

