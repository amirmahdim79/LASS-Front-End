import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetMyLabsAPI } from "api/labs"
import { GetLabEventsAPI } from "api/events";
import { GetUserTaskAPI } from "api/tasks";
import { GetUserTasksAPI } from "api/tasks";
import { GetLabBountiesAPI } from "api/bounties";

export const useLabActions = () => {
    const { showToast } = useToast();

    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: () => {},
        failedCallback: (e) => console.log(e),
    })

    const { pending: gettingLabEvents, request: getLabEvents } = useAPI({
        apiMethod: GetLabEventsAPI,

        successCallback: () => {},
        failedCallback: (e) => console.log(e),
    })

    const { pending: gettingUserTask, request: getUserTask } = useAPI({
        apiMethod: GetUserTaskAPI,

        successCallback: () => {},
        failedCallback: (e) => console.log(e),
    })

    const { pending: gettingUserTasks, request: getUserTasks } = useAPI({
        apiMethod: GetUserTasksAPI,

        successCallback: () => {},
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: gettingLabBounties, request: getLabBounties } = useAPI({
        apiMethod: GetLabBountiesAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
        },
    })

    
    
    return {
        getMyLabs,
        gettingMyLabs,

        getLabEvents,
        gettingLabEvents,

        getUserTasks,
        gettingUserTasks,

        getLabBounties,
        gettingLabBounties,
    }
}