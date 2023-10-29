import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthCheckAPI } from "api/authCheck"

export const useBaseActions = () => {
    const { showToast } = useToast();

    const { pending: checkingAuth, request: checkAuth } = useAPI({
        apiMethod: AuthCheckAPI,

        successCallback: (res) => {
            
        },
        
        failedCallback: (e) => {
        },
    })
    
    
    return {
        checkAuth,
        checkingAuth,

    }
}