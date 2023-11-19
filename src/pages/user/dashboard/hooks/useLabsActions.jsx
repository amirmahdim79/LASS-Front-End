import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetMyLabsAPI } from "api/labs"
import { GetLabEventsAPI } from "api/events";

export const useLabActions = () => {
    const { showToast } = useToast();

    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: gettingLabEvents, request: getLabEvents } = useAPI({
        apiMethod: GetLabEventsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })
    
    
    return {
        getMyLabs,
        gettingMyLabs,

        getLabEvents,
        gettingLabEvents,
    }
}