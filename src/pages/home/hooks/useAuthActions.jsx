import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthUserAPI, AuthSupAPI } from "api/auth"

export const useAuthActions = (setEmailErr, setPasswordErr) => {
    const {showToast} = useToast();

    const { pending: userAuthentication, request: authenticateUser } = useAPI({
        apiMethod: AuthUserAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            setEmailErr('');
            setPasswordErr('');
            if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            else if (e.response.data === '"email" must be a valid email') setEmailErr('ایمیل وارد شده معتبر نیست')
            else if (e.response.data === '"email" length must be at least 5 characters long') setEmailErr('ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد')
            else if (e.response.data === '"password" length must be at least 8 characters long') setPasswordErr('رمز وارد شده باید حداقل 8 کاراکتر داشته باشد')
            else if (e.response.data === 'Invalid email or password.') setPasswordErr('رمز یا ایمیل نامعتبر است')
        },
    })

    const { pending: supervisorAuthentication, request: authenticateSupervisor } = useAPI({
        apiMethod: AuthSupAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            setEmailErr('');
            setPasswordErr('');
            if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            else if (e.response.data === '"email" must be a valid email') setEmailErr('ایمیل وارد شده معتبر نیست')
            else if (e.response.data === '"email" length must be at least 5 characters long') setEmailErr('ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد')
            else if (e.response.data === '"password" length must be at least 8 characters long') setPasswordErr('رمز وارد شده باید حداقل 8 کاراکتر داشته باشد')
            else if (e.response.data === 'Invalid email or password.') setPasswordErr('رمز یا ایمیل نامعتبر است')
        },
    })

    
    
    return {
        authenticateUser,
        userAuthentication,

        authenticateSupervisor,
        supervisorAuthentication,
    }
}