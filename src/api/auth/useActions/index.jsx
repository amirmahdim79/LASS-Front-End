import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthUserAPI, AuthSupAPI } from "api/auth"
import { CreateSupsAPI } from "api/sups";
import { CreateUserAPI } from "api/users";

export const useAuthActions = (dispatchState, state) => {
    const {showToast} = useToast();

    const { pending: userAuthentication, request: authenticateUser } = useAPI({
        apiMethod: AuthUserAPI,

        successCallback: (res) => {
            // console.log(res);
        },
        
        failedCallback: (e) => {
            dispatchState({payload: {type: 'emailErr', value: ''}})
            dispatchState({payload: {type: 'passwordErr', value: ''}})
            if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            else if (e.response.data === '"email" must be a valid email') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده معتبر نیست'}})
            else if (e.response.data === '"email" length must be at least 5 characters long') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد'}}) 
            else if (e.response.data === '"password" length must be at least 8 characters long') dispatchState({payload: {type: 'passwordErr', value: 'رمز وارد شده باید حداقل 8 کاراکتر داشته باشد'}})  
            else if (e.response.data === 'Invalid email or password.') dispatchState({payload: {type: 'passwordErr', value: 'رمز یا ایمیل نامعتبر است'}})
        },
    })

    const { pending: supervisorAuthentication, request: authenticateSupervisor } = useAPI({
        apiMethod: AuthSupAPI,

        successCallback: (res) => {
            // console.log(res);
        },
        
        failedCallback: (e) => {
            dispatchState({payload: {type: 'emailErr', value: ''}})
            dispatchState({payload: {type: 'passwordErr', value: ''}})
            if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            else if (e.response.data === '"email" must be a valid email') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده معتبر نیست'}})
            else if (e.response.data === '"email" length must be at least 5 characters long') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد'}}) 
            else if (e.response.data === '"password" length must be at least 8 characters long') dispatchState({payload: {type: 'passwordErr', value: 'رمز وارد شده باید حداقل 8 کاراکتر داشته باشد'}}) 
            else if (e.response.data === 'Invalid email or password.') dispatchState({payload: {type: 'passwordErr', value: 'رمز یا ایمیل نامعتبر است'}})
        },
    })

    const { pending: userCreation, request: createUser } = useAPI({
        apiMethod: CreateUserAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            console.log(e);
            // dispatchState({payload: {type: 'emailErr', value: ''}})
            // dispatchState({payload: {type: 'passwordErr', value: ''}})
            // if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            // else if (e.response.data === '"email" must be a valid email') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده معتبر نیست'}})
            // else if (e.response.data === '"email" length must be at least 5 characters long') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد'}}) 
            // else if (e.response.data === '"password" length must be at least 8 characters long') dispatchState({payload: {type: 'passwordErr', value: 'رمز وارد شده باید حداقل 8 کاراکتر داشته باشد'}}) 
            // else if (e.response.data === 'Invalid email or password.') dispatchState({payload: {type: 'passwordErr', value: 'رمز یا ایمیل نامعتبر است'}})
        },
    })


    const { pending: supervisorCreation, request: createSupervisor } = useAPI({
        apiMethod: CreateSupsAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            if (state.degree.trim().length === 0) dispatchState({payload: {type: 'degreeErr', value: 'وارد کردن مقطع تحصیلی الزامی است'}})
            else if (state.sid.trim().length === 0) dispatchState({payload: {type: 'sidErr', value: 'وارد کردن شماره دانشجویی الزامی است'}})
            console.log(e);
            // dispatchState({payload: {type: 'emailErr', value: ''}})
            // dispatchState({payload: {type: 'passwordErr', value: ''}})
            // if (e.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            // else if (e.response.data === '"email" must be a valid email') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده معتبر نیست'}})
            // else if (e.response.data === '"email" length must be at least 5 characters long') dispatchState({payload: {type: 'emailErr', value: 'ایمیل وارد شده باید حداقل 5 کاراکتر داشته باشد'}}) 
            // else if (e.response.data === '"password" length must be at least 8 characters long') dispatchState({payload: {type: 'passwordErr', value: 'رمز وارد شده باید حداقل 8 کاراکتر داشته باشد'}}) 
            // else if (e.response.data === 'Invalid email or password.') dispatchState({payload: {type: 'passwordErr', value: 'رمز یا ایمیل نامعتبر است'}})
        },
    })

    
    
    return {
        authenticateUser,
        userAuthentication,

        authenticateSupervisor,
        supervisorAuthentication,

        createSupervisor,
        supervisorCreation,

        createUser,
        userCreation,
    }
}