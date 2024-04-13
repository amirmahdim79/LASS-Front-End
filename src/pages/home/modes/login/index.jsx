import TextInput from "components/global/inputs/textInput";
import { text } from "pages/home/constants";

export default function Login({state, dispatch}) {
    return (
        <>
            <TextInput
                value={state.email}
                onChange={(e) => dispatch({payload: {type: 'email', value: e.target.value}})}
                placeholder={text.input_1} 
                errorMessage={state.emailErr}
                showError={true}
                isValid={!state.emailErr}
                dir={'ltr'}
                autofill={true}
            />
            <TextInput 
                value={state.password}
                onChange={(e) => dispatch({payload: {type: 'password', value: e.target.value}})}
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