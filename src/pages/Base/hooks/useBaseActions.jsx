import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthCheckAPI, AuthCheckSupAPI } from "api/authCheck"
import { useNavigate } from 'react-router-dom'
import { GetMyLabsAPI } from "api/labs";

export const useBaseActions = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();


    const { pending: checkingAuth, request: checkAuth } = useAPI({
        apiMethod: AuthCheckAPI,

        successCallback: () => { },
        
        failedCallback: (e) => {
            console.log(e);
            navigate('/');
            showToast('لطفا دوباره وارد شوید', 'error');
        },
    })

    const { pending: checkingSupAuth, request: checkSupAuth } = useAPI({
        apiMethod: AuthCheckSupAPI,

        successCallback: () => { },
        
        failedCallback: (e) => {
            console.log(e);
            navigate('/');
            showToast('لطفا دوباره وارد شوید', 'error');
        },
    })

    
    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    
    
    return {
        checkAuth,
        checkingAuth,

        checkSupAuth,
        checkingSupAuth,

        getMyLabs,
        gettingMyLabs,
    }
}