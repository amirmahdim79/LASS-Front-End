import { useNavigate } from 'react-router-dom'
import { text } from './constants';
import { useAuthActions } from './hooks/useAuthActions';
import { default as cs } from 'classnames'
import styles from './home.module.scss'
import Logo from 'components/global/logo';
import Switch from 'components/global/toggleSwitch';
import LoginPageImage from 'assets/images/login_page.svg';
import TextInput from 'components/global/inputs/textInput';
import useInput from 'hooks/useInputHandler';
import colors from "styles/colors.module.scss"
import Button from 'components/global/button';


export default function HomePage() {

    const navigate = useNavigate();

    const { value: email, onChange: onChangeEmail } = useInput('');
    const { value: password, onChange: onChangePassword } = useInput('');
    const { value: type, setValue: setType } = useInput('دانشجو');

    const { authenticateUser, authenticateSupervisor } = useAuthActions();


    const login = () => {
        if (type === 'دانشجو') {
            authenticateUser({ email:email, password:password }).then(res => {
                console.log("............rrrrrrrrrrrr", res);
            }).catch(err => {
                console.log("...........eeeeeeeeeeeeeeee", err);
            }).finally(() => {
                navigate('/user/dashboard')
            })
        }else if (type === 'استاد') {
            authenticateSupervisor({ email:email, password:password }).then(res => {
                console.log("............rrrrrrrrrrrr", res);
            }).catch(err => {
                console.log("...........eeeeeeeeeeeeeeee", err);
            }).finally(() => {
                // navigate('/dashboard/user')
            })
        }
    }       

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['login_form'])}>
                <div className={cs(styles['inner_container'])}  style={{maxHeight: '540px', marginBottom: '40px'}}>
                    <div className={cs(styles['inner_container'])} style={{maxHeight:'380px'}}>
                        <div className={cs(styles['inner_container'])} style={{maxHeight:'160px'}}>
                            <Logo color={'light'}/>
                            <h1>{text.title}</h1>
                        </div>
                        <div className={cs(styles['inputs_container'])}>
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
                    </div>

                    <div className={cs(styles['buttons_container'])}>
                        <Switch 
                            left={text.switch_left_data} 
                            right={text.switch_right_data}
                            setValue={setType}
                        />
                        <Button 
                            color={colors['dark-shades-100']} 
                            onClick={() => login()}
                            text={text.button} 
                            disabled={!email || !password}
                        />
                    </div>
                </div>
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