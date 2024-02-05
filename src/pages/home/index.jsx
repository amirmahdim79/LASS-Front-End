import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { text } from './constants';
import { useAuthActions } from './hooks/useAuthActions';
import { default as cs } from 'classnames'
import { addUser } from "store/userSlice/index"
import styles from './home.module.scss'
import Logo from 'components/global/logo';
import Switch from 'components/global/toggleSwitch';
import LoginPageImage from 'assets/images/login_page.svg';
import SignUpPageImage from 'assets/images/signup_page.svg';
import TextInput from 'components/global/inputs/textInput';
import useInput from 'hooks/useInputHandler';
import colors from "styles/colors.module.scss"
import Button from 'components/global/button';
import { useDispatch } from 'react-redux';


export default function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { value: email, onChange: onChangeEmail } = useInput('');
    const { value: password, onChange: onChangePassword } = useInput('');
    const { value: firstName, onChange: onChangeFirstName } = useInput('');
    const { value: lastName, onChange: onChangeLastName } = useInput('');

    const { value: emailErr, setValue: setEmailErr } = useInput('');
    const { value: passwordErr, setValue: setPasswordErr } = useInput('');
    const { value: firstNameErr, setValue: setFirstNameErr } = useInput('');
    const { value: lastNameErr, setValue: setLastNameErr } = useInput('');

    const { value: type, setValue: setType } = useInput('دانشجو');
    const { value: mode, setValue: setMode } = useInput('login');

    const { 
            authenticateUser, userAuthentication,
            authenticateSupervisor, supervisorAuthentication 
        } = useAuthActions(setEmailErr, setPasswordErr);

    const login = () => {
        if (type === 'دانشجو') {
            authenticateUser({ email:email.replace(/^\s+|\s+$/gm,''), password:password.replace(/^\s+|\s+$/gm,'') }).then(res => {
                dispatch(addUser(res.data))
                localStorage.setItem('type', 'user')
                navigate('/user/dashboard')
            }).catch(err => {
                console.log("...........eeeeeeeeeeeeeeee", err);
            })
        }else if (type === 'استاد') {
            authenticateSupervisor({ email:email.replace(/^\s+|\s+$/gm,''), password:password.replace(/^\s+|\s+$/gm,'') }).then(res => {
                localStorage.setItem('type', 'supervisor')
                dispatch(addUser(res.data))
                navigate('/supervisor/dashboard')
            }).catch(err => {
                console.log("...........eeeeeeeeeeeeeeee", err);
            })
        }
    }    
    
    useEffect(() => {
        setEmailErr('')
    }, [email, type, password])

    useEffect(() => {
        setPasswordErr('')
    }, [password, type])
    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['login_form'])} style={{...(mode === 'signup' && {rowGap: '20px'})}}>
                <div className={cs(styles['header'])}>
                    <Logo color={'light'}/>
                    <h1>{text.title[mode]}</h1>
                </div>
                <div className={cs(styles['inputs'])} style={{...(mode === 'signup' && {rowGap: '16px'})}}>
                    <TextInput 
                        value={email}
                        onChange={onChangeEmail}
                        placeholder={text.input_1} 
                        errorMessage={emailErr}
                        showError={true}
                        isValid={!emailErr}
                        dir={'ltr'}
                    />
                    <TextInput 
                        value={password}
                        onChange={onChangePassword}
                        placeholder={text.input_2} 
                        errorMessage={passwordErr}
                        showError={true}
                        isValid={!passwordErr}
                        dir={'ltr'}
                        type={'password'}
                    />
                    {
                        mode === 'signup' && (
                            <>
                                <TextInput 
                                    value={firstName}
                                    onChange={onChangeFirstName}
                                    placeholder={text.input_3} 
                                    errorMessage={firstNameErr}
                                    showError={true}
                                    isValid={!firstNameErr}
                                    dir={'rtl'}
                                />
                                <TextInput 
                                    value={lastName}
                                    onChange={onChangeLastName}
                                    placeholder={text.input_4} 
                                    errorMessage={lastNameErr}
                                    showError={true}
                                    isValid={!lastNameErr}
                                    dir={'rtl'}
                                />
                            </>
                        )
                    }
                </div>
                <div className={cs(styles['buttons'])} style={{...(mode === 'signup' && {paddingTop: '16px'})}}>
                    <Switch 
                        left={text.switch_left_data} 
                        right={text.switch_right_data}
                        setValue={setType}
                        value={type}
                    />
                    <Button 
                        color={colors['dark-shades-100']} 
                        onClick={() => login()}
                        text={mode === 'signup' ? text.signup_button : text.login_button} 
                        disabled={!email || !password}
                        load={type === 'دانشجو' ? userAuthentication : supervisorAuthentication}
                    />
                    {mode === 'signup' 
                        ? (
                            <p onClick={() => setMode('login')}> {text.signup_mode_footer_text} <span> {text.signup_mode_footer_text2} </span> </p>
                        ) : (
                            <p onClick={() => setMode('signup')}> {text.login_mode_footer_text} <span> {text.login_mode_footer_text2} </span> </p>
                        )
                    }
                </div>
                {/* <div className={cs(styles['inner_container'])}  style={{maxHeight: '540px', marginBottom: '40px'}}>
                    <div className={cs(styles['inner_container'])} style={{maxHeight:'380px'}}>
                        <div className={cs(styles['inner_container'])} style={{maxHeight:'160px'}}>
                            <Logo color={'light'}/>
                            <h1>{text.title[mode]}</h1>
                        </div>
                        <div className={cs(styles['inputs_container'])}>
                            <TextInput 
                                value={email}
                                onChange={onChangeEmail}
                                placeholder={text.input_1} 
                                errorMessage={emailErr}
                                showError={true}
                                isValid={!emailErr}
                                dir={'ltr'}
                            />
                            <TextInput 
                                value={password}
                                onChange={onChangePassword}
                                placeholder={text.input_2} 
                                errorMessage={passwordErr}
                                showError={true}
                                isValid={!passwordErr}
                                dir={'ltr'}
                                type={'password'}
                            />
                            {
                                mode === 'signup' && (
                                    <>
                                        <TextInput 
                                            value={email}
                                            onChange={onChangeEmail}
                                            placeholder={text.input_1} 
                                            errorMessage={emailErr}
                                            showError={true}
                                            isValid={!emailErr}
                                            dir={'ltr'}
                                        />
                                        <TextInput 
                                            value={password}
                                            onChange={onChangePassword}
                                            placeholder={text.input_2} 
                                            errorMessage={passwordErr}
                                            showError={true}
                                            isValid={!passwordErr}
                                            dir={'ltr'}
                                            type={'password'}
                                        />
                                    </>
                                )
                            }
                            
                        </div>
                    </div>

                    <div className={cs(styles['buttons_container'])}>
                        <Switch 
                            left={text.switch_left_data} 
                            right={text.switch_right_data}
                            setValue={setType}
                            value={type}
                        />
                        <Button 
                            color={colors['dark-shades-100']} 
                            onClick={() => login()}
                            text={text.login_button} 
                            disabled={!email || !password}
                            load={type === 'دانشجو' ? userAuthentication : supervisorAuthentication}
                            outlined={mode === 'signup'}
                        />
                        <Button 
                            color={colors['dark-shades-100']} 
                            onClick={() => login()}
                            text={text.signup_button} 
                            disabled={!email || !password}
                            load={type === 'دانشجو' ? userAuthentication : supervisorAuthentication}
                            outlined={mode === 'login'}
                        />
                    </div>
                </div> */}
            </div>
            <div className={cs(styles['login_page_image_container'])}>
                <img 
                    className={cs(styles['login_page_image'])}
                    src={mode === 'login' ? LoginPageImage : SignUpPageImage}
                    alt='login_page_image'
                />
            </div>
        </div>
    )
}