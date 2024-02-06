import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

import { AddNewBountyAPI } from "api/bounties";
import { DeleteBountyAPI } from "api/bounties";
import { GetLabBountiesAPI } from "api/bounties";
import { GetBountyInfoAPI } from "api/bounties";

export const useBountyActions = () => {
    const { showToast } = useToast();

    const { pending: addingNewBounty, request: addNewBounty } = useAPI({
        apiMethod: AddNewBountyAPI,

        successCallback: (res) => {
            showToast('فعالیت امتیازی با موفقیت اضافه شد', 'success');
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
        },
    })

    const { pending: deletingBounty, request: deleteBounty } = useAPI({
        apiMethod: DeleteBountyAPI,

        successCallback: (res) => {
            showToast('فعالیت امتیازی با موفقیت حذف شد', 'success');
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
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

    
    const { pending: gettingBountyInfo, request: getBountyInfo } = useAPI({
        apiMethod: GetBountyInfoAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
        },
    })

    
    return {
        addNewBounty,
        addingNewBounty,

        deleteBounty,
        deletingBounty,

        getLabBounties,
        gettingLabBounties,

        getBountyInfo,
        gettingBountyInfo,
    }
}