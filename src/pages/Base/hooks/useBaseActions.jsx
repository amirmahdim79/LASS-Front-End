import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AuthCheckAPI, AuthCheckSupAPI } from "api/authCheck"
import { useNavigate } from 'react-router-dom'
import { GetMyLabsAPI } from "api/labs";
import { GetLabGroupsAPI } from "api/groups";
import { GetLabForumsAPI } from "api/forum";
import { GetOneForumDataAPI } from "api/forum";

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

    const { pending: gettingLabGroups, request: getLabGroups } = useAPI({
        apiMethod: GetLabGroupsAPI,

        successCallback: (res) => {},
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: gettingLabForums, request: getLabForums } = useAPI({
        apiMethod: GetLabForumsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
        initialLoading: true
    })

    const { pending: gettingOneForum, request: getOneForum } = useAPI({
        apiMethod: GetOneForumDataAPI,

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

        getLabGroups,
        gettingLabGroups,

        getLabForums,
        gettingLabForums,

        getOneForum,
        gettingOneForum
    }
}