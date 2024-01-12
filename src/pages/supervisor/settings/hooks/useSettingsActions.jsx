import { UpdateLabGroupAPI } from "api/groups";
import { DeleteLabGroupAPI, GetLabGroupsAPI } from "api/groups";
import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

export const useSettingsActions = () => {
    const { showToast } = useToast();

    const { pending: deletingLabGroup, request: deleteLabGroup } = useAPI({
        apiMethod: DeleteLabGroupAPI,

        successCallback: () => {
            showToast('گروه با موفقیت حذف شد', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: gettingLabGroups, request: getLabGroups } = useAPI({
        apiMethod: GetLabGroupsAPI,

        successCallback: (res) => {},
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: updatingLabGroup, request: updateLabGroup } = useAPI({
        apiMethod: UpdateLabGroupAPI,

        successCallback: () => {},
        
        failedCallback: (err) => {
            console.log(err);
        },
    })


    
    
    return {
        deleteLabGroup,
        deletingLabGroup,

        getLabGroups,
        gettingLabGroups,

        updateLabGroup,
        updatingLabGroup,
    }
}