import styles from './home.module.scss'
import {default as cs} from 'classnames'
import { text } from './constants';
import Logo from 'components/global/logo';
import Switch from 'components/global/toggleSwitch';
import LoginPageImage from 'assets/images/login_page.svg';
import TextInput from 'components/global/inputs/textInput';
import useInput from 'hooks/useInputHandler';
import { useAuthActions } from './hooks/useAuthActions';
import { useState } from 'react';



export default function HomePage() {

    const { value: email, setValue: setEmail, onChange: onChangeEmail, clear: clearEmail } = useInput('');
    const { value: password, setValue: setPassword, onChange: onChangePassword, clear: clearPassword } = useInput('');

    const { authenticate } = useAuthActions();

    const login = () => {
        authenticate({email, password}).then(res => {
            console.log("............rrrrrrrrrrrr", res);
        }).catch(err => {
            console.log("...........eeeeeeeeeeeeeeee", err);
        })
    }

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['login_form'])}>
                <Logo color={'light'}/>
                <h1>{text.title}</h1>
                <div style={{width: '355px', height: '130px'}}>
                    <TextInput 
                        value={email}
                        onChange={onChangeEmail}
                        inputLabel={text.input_1} 
                        dir={'ltr'}
                    />
                    <TextInput 
                        value={password}
                        onChange={onChangePassword}
                        inputLabel={text.input_2} 
                        dir={'ltr'}
                    />
                </div>
                <Switch left={text.switch_left_data} right={text.switch_right_data}/>
                <button onClick={() => login()}>
                    ورود
                </button>
            </div>
            <div className={cs(styles['login_page_image_container'])}>
                <img 
                    className={cs(styles['login_page_image'])}
                    src={LoginPageImage}
                    alt='login_page_image'
                />
            </div>
        </div>
    )
}