import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthCheckAPI, AuthCheckSupAPI } from "api/authCheck"

export const useBaseActions = () => {
    const { showToast } = useToast();

    const { pending: checkingAuth, request: checkAuth } = useAPI({
        apiMethod: AuthCheckAPI,
    })

    const { pending: checkingSupAuth, request: checkSupAuth } = useAPI({
        apiMethod: AuthCheckSupAPI,
    })
    
    
    return {
        checkAuth,
        checkingAuth,

        checkSupAuth,
        checkingSupAuth
    }
}