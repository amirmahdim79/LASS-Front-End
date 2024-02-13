import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { SearchPaperAPI } from "api/files";
import { GetNotificationsAPI } from "api/notifications";

export const useNavbarActions = () => {
    const { showToast } = useToast();

    const { pending: searchingPaper, request: searchPaper } = useAPI({
        apiMethod: SearchPaperAPI,

        successCallback: (res) => { },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: gettingNotifications, request: getNotifications } = useAPI({
        apiMethod: GetNotificationsAPI,

        successCallback: (res) => { },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })


    return {
        searchPaper,
        searchingPaper,

        getNotifications, 
        gettingNotifications
    }
}