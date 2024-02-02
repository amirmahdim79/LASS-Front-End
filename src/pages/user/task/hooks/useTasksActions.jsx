import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetUserTasksAPI } from "api/tasks";
import { GetUserTaskAPI } from "api/tasks";
import { CompleteReadingPapersAPI } from "api/tasks";
import { GetMilestoneTaskInfoAPI } from "api/tasks";

export const useTasksActions = () => {
    const { showToast } = useToast();

    const { pending: gettingUserTasks, request: getUserTasks } = useAPI({
        apiMethod: GetUserTasksAPI,

        successCallback: () => {},
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: gettingUserTask, request: getUserTask } = useAPI({
        apiMethod: GetUserTaskAPI,

        successCallback: () => {},
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: completingReadingPapers, request: completeReadingPapers } = useAPI({
        apiMethod: CompleteReadingPapersAPI,

        successCallback: () => {},
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: gettingMilestoneTask, request: getMilestoneTask } = useAPI({
        apiMethod: GetMilestoneTaskInfoAPI,

        successCallback: () => {},
        failedCallback: (e) => {
            console.log(e);
        },
    })


    
    return {
        getUserTasks,
        gettingUserTasks,

        getUserTask,
        gettingUserTask,

        completeReadingPapers,
        completingReadingPapers,

        getMilestoneTask,
        gettingMilestoneTask,
    }
}