import { GetLabEventsAPI } from "api/events";
import { CreateLabGroupAPI } from "api/groups";
import { UpdateLabGroupAPI } from "api/groups";
import { DeleteLabGroupAPI, GetLabGroupsAPI } from "api/groups";
import { GetSpecificLabDataAPI } from "api/labs";
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

    const { pending: groupCreation, request: createGroup } = useAPI({
        apiMethod: CreateLabGroupAPI,

        successCallback: () => {
            showToast('گروه با موفقیت ساخته شد', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
            if (err.message === 'Network Error') showToast('لطفا دوباره امتحان کنید', 'error');
            else if (err.response.data === 'You must at least add two users to a group.') showToast('شما باید حداقل دو کاربر را به یک گروه اضافه کنید', 'error');
        },
    })

    const { pending: gettingLabData, request: getLabData } = useAPI({
        apiMethod: GetSpecificLabDataAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.error(e)
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    const { pending: gettingLabEvents, request: getLabEvents } = useAPI({
        apiMethod: GetLabEventsAPI,

        successCallback: () => {},
        failedCallback: (e) => console.log(e),
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

        createGroup,
        groupCreation,

        getLabData,
        gettingLabData,
    }
}