import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthUserAPI, AuthSupAPI } from "api/auth"

export const useAuthActions = () => {
    const {showToast} = useToast();

    const { pending: userAuthentication, request: authenticateUser } = useAPI({
        apiMethod: AuthUserAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: supervisorAuthentication, request: authenticateSupervisor } = useAPI({
        apiMethod: AuthSupAPI,

        successCallback: (res) => {
            console.log(res);
        },
        
        failedCallback: (e) => {
            console.log( e);
        },
    })

    
    
    return {
        authenticateUser,
        userAuthentication,

        authenticateSupervisor,
        supervisorAuthentication,
    }
}