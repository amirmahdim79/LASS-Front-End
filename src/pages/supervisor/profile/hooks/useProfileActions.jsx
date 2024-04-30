import { GetUserActivitiesAPI } from "api/activity";
import { GetMyActivitiesAPI } from "api/activity";
import { AddSmartiesAPI } from "api/sups";
import { AddSandAPI } from "api/sups";
import { UpdateUserInfoAPI } from "api/users";
import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

export const useProfileActions = () => {
    const { showToast } = useToast();

    const { pending: updatingUserInfo, request: updateUserInfo } = useAPI({
        apiMethod: UpdateUserInfoAPI,

        successCallback: () => {
            showToast('ویرایش اطلاعات موفقیت آمیز بود', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: gettingMyActivities, request: getMyActivities } = useAPI({
        apiMethod: GetMyActivitiesAPI,

        successCallback: () => { },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: gettingUserActivities, request: getUserActivities } = useAPI({
        apiMethod: GetUserActivitiesAPI,

        successCallback: () => { },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })
    
    
    const { pending: addingSandToUser, request: addSandToUser } = useAPI({
        apiMethod: AddSandAPI,

        successCallback: () => { 
            showToast('زمان با موفقیت اضافه شد', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: addingSmartiesToUser, request: addSmartiesToUser } = useAPI({
        apiMethod: AddSmartiesAPI,

        successCallback: () => {
            showToast('اسمارتیز با موفقیت اضافه شد', 'success')
         },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })
    
    return {
        updateUserInfo,
        updatingUserInfo,

        getMyActivities,
        gettingMyActivities,

        getUserActivities,
        gettingUserActivities,

        addSandToUser,
        addingSandToUser,

        addSmartiesToUser,
        addingSmartiesToUser,
    }
}