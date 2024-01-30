import { UpdateLabGroupAPI } from "api/groups";
import { DeleteLabGroupAPI, GetLabGroupsAPI } from "api/groups";
import { GetPermissionsListAPI } from "api/labs";
import { AddPermissionToUserAPI } from "api/sups";
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

    const { pending: updatingPermissions, request: updatePermissions } = useAPI({
        apiMethod: AddPermissionToUserAPI,

        successCallback: () => {
            showToast('دسترسی های مد نظر با موفقیت اضافه شدند', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    const { pending: gettingPermissions, request: getPermissions } = useAPI({
        apiMethod: GetPermissionsListAPI,

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

        updatePermissions,
        updatingPermissions,

        getPermissions,
        gettingPermissions,
    }
}