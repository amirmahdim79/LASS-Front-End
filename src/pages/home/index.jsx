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
import SelectInputV1 from 'components/global/inputs/selectInputs/selectInputV2';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { degreeMapper } from 'utils/mapper';
import { validateEmail } from 'utils/mapper';


export default function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        sid: '',
        degree: '',

        emailErr: '',
        passwordErr: '',
        firstNameErr: '',
        lastNameErr: '',
        sidErr: '',
        degreeErr: '',

        type: 'دانشجو',
        mode: 'login',
    }

    const [ state , dispatchState] = useReducer( reducer, initialState );


    const { 
            authenticateUser, userAuthentication,
            authenticateSupervisor, supervisorAuthentication ,
            createUser, userCreation,
            createSupervisor, supervisorCreation
        } = useAuthActions(dispatchState, state);


    const login = () => {
        if (state.type === 'دانشجو') {
            authenticateUser({ email: state.email.replace(/^\s+|\s+$/gm,''), password: state.password.replace(/^\s+|\s+$/gm,'') }).then(res => {
                dispatch(addUser(res.data))
                localStorage.setItem('type', 'user')
                navigate('/user/dashboard')
            }).catch(err => {
                console.log(err);
            })
        }else if (state.type === 'استاد') {
            authenticateSupervisor({ email: state.email.replace(/^\s+|\s+$/gm,''), password: state.password.replace(/^\s+|\s+$/gm,'') }).then(res => {
                localStorage.setItem('type', 'supervisor')
                dispatch(addUser(res.data))
                navigate('/supervisor/dashboard')
            }).catch(err => {
                console.log(err);
            })
        }
    }    

    const signup = () => {
        if (state.type === 'دانشجو') {
            let data = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email.replace(/^\s+|\s+$/gm,''),
                password: state.password.replace(/^\s+|\s+$/gm,''),
                sid: state.sid,
                type: degreeMapper(state.degree),
            }
            createUser({...data})
                .then(res => {
                    dispatch(addUser(res.data));
                    localStorage.setItem('type', 'user');
                    navigate('/user/dashboard');
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

        }else if (state.type === 'استاد') {
            let data = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email.replace(/^\s+|\s+$/gm,''),
                password: state.password.replace(/^\s+|\s+$/gm,''),
            }
            createSupervisor({...data})
                .then(res => {
                    dispatch(addUser(res.data));
                    localStorage.setItem('type', 'supervisor');
                    navigate('/supervisor/dashboard')
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }   

    const checkBtnIsDisabled = () => {
        if (state.mode === 'signup') {
            if (state.type === 'دانشجو') {
                return !state.email.trim().length || !state.password.trim().length || 
                    !state.firstName.trim().length || !state.lastName.trim().length || 
                    !state.sid.trim().length || !state.degree.trim().length || 
                    !validateEmail(state.email) || state.password.toString().length < 8
            } else {
                return !state.email.trim().length || !state.password.trim().length || 
                    !state.firstName.trim().length || !state.lastName.trim().length || 
                    !validateEmail(state.email) || state.password.toString().length < 8
            }
        } else {
            return !state.email.trim().length || !state.password.trim().length || 
            !validateEmail(state.email) || state.password.toString().length < 8
        }


    }

    const checkBtnLoadingStatus = () => {
        if (state.mode === 'signup') {
            if (state.type === 'دانشجو') return userCreation
            else return supervisorCreation
        } else {
            if (state.type === 'دانشجو') return userAuthentication
            else return supervisorAuthentication
        }
    }
    
    useEffect(() => {
        dispatchState({payload: {type: 'emailErr', value: ''}})
    }, [state.email, state.type, state.password])

    useEffect(() => {
        dispatchState({payload: {type: 'passwordErr', value: ''}})
    }, [state.password, state.type])

    useEffect(() => {
        if (state.email.trim().length) {
            if (state.email.length < 5) dispatchState({payload: {type: 'emailErr', value:'ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد'}})
            else if (!validateEmail(state.email)) dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده معتبر نیست'}})
        }
    }, [state.email])

    useEffect(() => {
        if (state.password.trim().length) {
            if (state.password.toString().length < 8) dispatchState({payload: {type: 'passwordErr', value: 'رمز وارد شده باید حداقل 8 کاراکتر داشته باشد'}})
        }
    }, [state.password])



    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['form'], state.mode === 'signup' ? styles['signup_form'] : styles['login_form'])}>
                <div className={cs(styles['header'])}>
                    <Logo color={'light'}/>
                    <h1>{text.title[state.mode]}</h1>
                </div>
                <form className={cs(styles['inputs'], (state.type !== 'دانشجو' && state.mode === 'signup') && styles['sups_form'])} >
                    {
                        state.mode === 'login' && (
                            <>
                                <TextInput 
                                    value={state.email}
                                    onChange={(e) => dispatchState({payload: {type: 'email', value: e.target.value}})}
                                    placeholder={text.input_1} 
                                    errorMessage={state.emailErr}
                                    showError={true}
                                    isValid={!state.emailErr}
                                    dir={'ltr'}
                                    autofill={true}
                                />
                                <TextInput 
                                    value={state.password}
                                    onChange={(e) => dispatchState({payload: {type: 'password', value: e.target.value}})}
                                    placeholder={text.input_2} 
                                    errorMessage={state.passwordErr}
                                    showError={true}
                                    isValid={!state.passwordErr}
                                    dir={'ltr'}
                                    type={'password'}
                                />
                            </>
                        )
                    }

                    {
                        state.mode === 'signup' && (
                            state.type === 'دانشجو'
                                ? (
                                    <>
                                        <TextInput 
                                            value={state.email}
                                            onChange={(e) => dispatchState({payload: {type: 'email', value: e.target.value}})}
                                            placeholder={text.input_1} 
                                            errorMessage={state.emailErr}
                                            showError={true}
                                            isValid={!state.emailErr}
                                            dir={'ltr'}
                                            type={'email'}
                                        />
                                        <TextInput 
                                            value={state.firstName}
                                            onChange={(e) => dispatchState({payload: {type: 'firstName', value: e.target.value}})}
                                            placeholder={text.input_3} 
                                            errorMessage={state.firstNameErr}
                                            showError={true}
                                            isValid={!state.firstNameErr}
                                            dir={'rtl'}
                                        />
                                        <TextInput 
                                            value={state.lastName}
                                            onChange={(e) => dispatchState({payload: {type: 'lastName', value: e.target.value}})}
                                            placeholder={text.input_4} 
                                            errorMessage={state.lastNameErr}
                                            showError={true}
                                            isValid={!state.lastNameErr}
                                            dir={'rtl'}
                                        />
                                        <TextInput 
                                            value={state.password}
                                            onChange={(e) => dispatchState({payload: {type: 'password', value: e.target.value}})}
                                            placeholder={text.input_2} 
                                            errorMessage={state.passwordErr}
                                            showError={true}
                                            isValid={!state.passwordErr}
                                            dir={'ltr'}
                                            type={'password'}
                                        />
                                        <TextInput 
                                            value={state.sid}
                                            onChange={(e) => dispatchState({payload: {type: 'sid', value: e.target.value}})}
                                            placeholder={text.input_5} 
                                            errorMessage={state.sidErr}
                                            showError={true}
                                            isValid={!state.sidErr}
                                            dir={'rtl'}
                                        />
                                        <SelectInputV1
                                            height={'48px'}
                                            value={state.degree}
                                            setValue={(e) => dispatchState({payload: {type: 'degree', value: e}})}
                                            dir={'rtl'}
                                            placeholder={text.input_6} 
                                            suggestions={['کارشناسی', 'کارشناسی ارشد', 'دکترا', 'فوق دکترا', 'کارآموز']}
                                        />
    
                                    </>
                                ) : (
                                    <>
                                        <TextInput 
                                            value={state.firstName}
                                            onChange={(e) => dispatchState({payload: {type: 'firstName', value: e.target.value}})}
                                            placeholder={text.input_3} 
                                            errorMessage={state.firstNameErr}
                                            showError={true}
                                            isValid={!state.firstNameErr}
                                            dir={'rtl'}
                                        />
                                        <TextInput 
                                            value={state.lastName}
                                            onChange={(e) => dispatchState({payload: {type: 'lastName', value: e.target.value}})}
                                            placeholder={text.input_4} 
                                            errorMessage={state.lastNameErr}
                                            showError={true}
                                            isValid={!state.lastNameErr}
                                            dir={'rtl'}
                                        />
                                        <TextInput 
                                            value={state.email}
                                            onChange={(e) => dispatchState({payload: {type: 'email', value: e.target.value}})}
                                            placeholder={text.input_1} 
                                            errorMessage={state.emailErr}
                                            showError={true}
                                            isValid={!state.emailErr}
                                            dir={'ltr'}
                                            type={'email'}
                                        />
                                        <TextInput 
                                            value={state.password}
                                            onChange={(e) => dispatchState({payload: {type: 'password', value: e.target.value}})}
                                            placeholder={text.input_2} 
                                            errorMessage={state.passwordErr}
                                            showError={true}
                                            isValid={!state.passwordErr}
                                            dir={'ltr'}
                                            type={'password'}
                                        />
                                    </>
                                )
                        )
                    }

                </form>
                <div className={cs(styles['buttons'])} style={{...(state.mode === 'signup' && {paddingTop: '16px'})}}>
                    <Switch 
                        left={text.switch_left_data} 
                        right={text.switch_right_data}
                        setValue={(e) => dispatchState({payload: {type: 'type', value: e}})}
                        value={state.type}
                    />
                    <Button 
                        color={colors['dark-shades-100']} 
                        onClick={() => state.mode === 'signup' ? signup() : login()}
                        text={state.mode === 'signup' ? text.signup_button : text.login_button} 
                        disabled={checkBtnIsDisabled()}
                        load={checkBtnLoadingStatus()}
                    />
                    {state.mode === 'signup' 
                        ? (
                            <p onClick={(e) => dispatchState({payload: {type: 'mode', value: 'login'}})}> {text.signup_mode_footer_text} <span> {text.signup_mode_footer_text2} </span> </p>
                        ) : (
                            <p onClick={(e) => dispatchState({payload: {type: 'mode', value: 'signup'}})}> {text.login_mode_footer_text} <span> {text.login_mode_footer_text2} </span> </p>
                        )
                    }
                </div>
            </div>
            {
                state.mode === 'login' && (
                    <div className={cs(styles['login_page_image_container'])}>
                    <img 
                        className={cs(styles['login_page_image'])}
                        src={state.mode === 'login' ? LoginPageImage : SignUpPageImage}
                        alt='login_page_image'
                    />
                </div>
                )
            }
        </div>
    )
}