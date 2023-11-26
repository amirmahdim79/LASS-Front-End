
import { CreateLabEventAPI } from "api/events";
import { GetSpecificLabDataAPI } from "api/labs";
import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

export const useCreateEventActions = () => {
    const { showToast } = useToast();

    const { pending: gettingLabData, request: getLabData } = useAPI({
        apiMethod: GetSpecificLabDataAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.error(e)
            console.log("eeeeee", e);
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: eventCreation, request: createEvent } = useAPI({
        apiMethod: CreateLabEventAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.error(e)
            console.log("eeeeee", e);
            showToast('مشکلی پیش اومده', 'error')
        },
    })


    
    
    return {
        getLabData,
        gettingLabData,

        createEvent,
        eventCreation,
    }
}