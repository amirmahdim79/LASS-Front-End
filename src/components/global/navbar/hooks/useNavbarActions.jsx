import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { SearchPaperAPI } from "api/files";

export const useNavbarActions = () => {
    const { showToast } = useToast();

    const { pending: searchingPaper, request: searchPaper } = useAPI({
        apiMethod: SearchPaperAPI,

        successCallback: (res) => { },
        
        failedCallback: (err) => {
            console.log(err);
        },
    })

    

    
    
    return {
        searchPaper,
        searchingPaper,
    }
}