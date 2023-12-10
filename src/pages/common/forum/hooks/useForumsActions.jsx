import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetMyLabsAPI } from "api/labs"

export const useForumsActions = () => {
    const { showToast } = useToast();

    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })


    
    return {
        getMyLabs,
        gettingMyLabs,

    }
}