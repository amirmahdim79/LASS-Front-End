import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthUserAPI } from "api/auth"

export const useAuthActions = () => {
    const {showToast} = useToast();

    const { pending: authentication, request: authenticate } = useAPI({
        apiMethod: AuthUserAPI,

        successCallback: (res) => {
            console.log("resssssssssssssssssssssssssss", res);
        },
        
        failedCallback: (e) => {
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
        },
    })

    
    
    return {
        authenticate,
        authentication
    }
}