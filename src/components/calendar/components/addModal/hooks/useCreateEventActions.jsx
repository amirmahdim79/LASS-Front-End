
import { DeleteLabEventAPI } from "api/events";
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
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: eventCreation, request: createEvent } = useAPI({
        apiMethod: CreateLabEventAPI,

        successCallback: () => {
            showToast('رویداد با موفقیت اضافه شد', 'success')
        },
        
        failedCallback: (e) => {
            console.log("createEvent failed", e)
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: deletingEvent, request: deleteEvent } = useAPI({
        apiMethod: DeleteLabEventAPI,

        successCallback: () => {
            showToast('رویداد با موفقیت حذف شد', 'success')
        },
        
        failedCallback: (e) => {
            console.log("createEvent failed", e)
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    
    return {
        getLabData,
        gettingLabData,

        createEvent,
        eventCreation,

        deleteEvent,
        deletingEvent

    }
}