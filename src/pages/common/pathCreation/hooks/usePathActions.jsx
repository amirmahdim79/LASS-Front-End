import { CreatePathAPI } from "api/path";
import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

export const usePathActions = () => {
    const { showToast } = useToast();

    const { pending: pathCreation, request: createPath } = useAPI({
        apiMethod: CreatePathAPI,

        successCallback: () => {
            showToast('مسیر راه با موفقیت حذف شد', 'success')
        },
        
        failedCallback: (err) => {
            console.log(err);
            showToast('مشکلی پیش اومده', 'error')
        },
    })

    
    
    return {
        createPath,
        pathCreation,
    }
}