import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { AddNewDocAPI } from "api/documents";
import { GetLabDocsAPI } from "api/documents";

export const useNotesActions = () => {
    const { showToast } = useToast();

    const { pending: addingNewDoc, request: addNewDoc } = useAPI({
        apiMethod: AddNewDocAPI,

        successCallback: (res) => {
            showToast('یادداشت با موفقیت اضافه شد', 'success');
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
        },
    })

    const { pending: gettingLabDocs, request: getLabDocs } = useAPI({
        apiMethod: GetLabDocsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            showToast('مشکلی پیش آمده', 'error');
        },
    })

    
    return {
        addNewDoc,
        addingNewDoc,

        getLabDocs,
        gettingLabDocs,
    }
}