import { GetLeaderboardAPI } from "api/labs";
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

    const { pending: gettingLeaderboard, request: getLeaderboard } = useAPI({
        apiMethod: GetLeaderboardAPI,

        successCallback: () => {
        },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })


    
    return {
        updateUserInfo,
        updatingUserInfo,

        getLeaderboard,
        gettingLeaderboard

    }
}