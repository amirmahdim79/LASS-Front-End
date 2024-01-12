import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { text } from './constants';
import Button from 'components/global/button';



export default function ComposeEmail() {


    return (
        <div className={cs(styles['container'])}>

            <div className={cs(styles['header'])}>
                <p className={cs(styles['title'])}> {text.title} </p>
                <div className={cs(styles['buttons_container'])}>
                    <Button
                        color={colors['main-color-100']} 
                        // onClick={() => onCancel()}
                        text={text.button_1} 
                        fontSize={'16px'}
                        fontWeight={'600'}
                        fontFamily={'pinar_semi_bold'}
                    />
                    <Button
                        color={colors['main-color-100']} 
                        // onClick={() => onCancel()}
                        text={text.button_2} 
                        outlined={true}
                        fontSize={'16px'}
                        fontWeight={'600'}
                        fontFamily={'pinar_semi_bold'}
                    />
                </div>
            </div>

            <div className={cs(styles['compose_box'])}>
                <div className={cs(styles['receiver_container'], styles['subtitle_container'])}>
                    <p className={cs(styles['subtitle'])}> {text.subtitle_1} </p>

                </div>
                <div className={cs(styles['title_container'], styles['subtitle_container'])}>
                    <p className={cs(styles['subtitle'])}> {text.subtitle_2} </p>

                </div>
                <div className={cs(styles['message_container'])}>

                </div>

            </div>

        </div>
    )
}