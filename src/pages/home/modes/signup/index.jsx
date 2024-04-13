import SelectInputV1 from "components/global/inputs/selectInputs/selectInputV2";
import TextInput from "components/global/inputs/textInput";
import { text } from "pages/home/constants";

export default function Signup({state, dispatch}) {
    return (
        state.type === 'دانشجو'
            ? (
                <>
                    <TextInput 
                        value={state.email}
                        onChange={(e) => dispatch({payload: {type: 'email', value: e.target.value}})}
                        placeholder={text.input_1} 
                        errorMessage={state.emailErr}
                        showError={true}
                        isValid={!state.emailErr}
                        dir={'ltr'}
                        type={'email'}
                    />
                    <TextInput 
                        value={state.firstName}
                        onChange={(e) => dispatch({payload: {type: 'firstName', value: e.target.value}})}
                        placeholder={text.input_3} 
                        errorMessage={state.firstNameErr}
                        showError={true}
                        isValid={!state.firstNameErr}
                        dir={'rtl'}
                    />
                    <TextInput 
                        value={state.lastName}
                        onChange={(e) => dispatch({payload: {type: 'lastName', value: e.target.value}})}
                        placeholder={text.input_4} 
                        errorMessage={state.lastNameErr}
                        showError={true}
                        isValid={!state.lastNameErr}
                        dir={'rtl'}
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
                    <TextInput 
                        value={state.sid}
                        onChange={(e) => dispatch({payload: {type: 'sid', value: e.target.value}})}
                        placeholder={text.input_5} 
                        errorMessage={state.sidErr}
                        showError={true}
                        isValid={!state.sidErr}
                        dir={'rtl'}
                    />
                    <SelectInputV1
                        height={'48px'}
                        value={state.degree}
                        setValue={(e) => dispatch({payload: {type: 'degree', value: e}})}
                        dir={'rtl'}
                        placeholder={text.input_6} 
                        suggestions={['کارشناسی', 'کارشناسی ارشد', 'دکترا', 'فوق دکترا', 'کارآموز']}
                    />

                </>
            ) : (
                <>
                    <TextInput 
                        value={state.firstName}
                        onChange={(e) => dispatch({payload: {type: 'firstName', value: e.target.value}})}
                        placeholder={text.input_3} 
                        errorMessage={state.firstNameErr}
                        showError={true}
                        isValid={!state.firstNameErr}
                        dir={'rtl'}
                    />
                    <TextInput 
                        value={state.lastName}
                        onChange={(e) => dispatch({payload: {type: 'lastName', value: e.target.value}})}
                        placeholder={text.input_4} 
                        errorMessage={state.lastNameErr}
                        showError={true}
                        isValid={!state.lastNameErr}
                        dir={'rtl'}
                    />
                    <TextInput 
                        value={state.email}
                        onChange={(e) => dispatch({payload: {type: 'email', value: e.target.value}})}
                        placeholder={text.input_1} 
                        errorMessage={state.emailErr}
                        showError={true}
                        isValid={!state.emailErr}
                        dir={'ltr'}
                        type={'email'}
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
    )
}