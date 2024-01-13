import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetAllPapersAPI, AddNewPaperAPI, SearchPaperAPI } from "api/files";
import { SearchTagsAPI } from "api/tags";
import { AddUserRecentFileAPI } from "api/users";

export const useArticlesActions = () => {
    const { showToast } = useToast();


    const { pending: gettingAllPapers, request: getAllPapers } = useAPI({
        apiMethod: GetAllPapersAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            console.log("eeeeeeeeeeeeeeeeeeeeeeee", e);
        },
    })

    
    const { pending: addingPaper, request: addPaper } = useAPI({
        apiMethod: AddNewPaperAPI,
        

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.log("cant add papers", e);
        },
    })

    const { pending: searchingTags, request: searchTags } = useAPI({
        apiMethod: SearchTagsAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: searchingPaper, request: searchPaper } = useAPI({
        apiMethod: SearchPaperAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: addingRecentFile, request: addRecentFile } = useAPI({
        apiMethod: AddUserRecentFileAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            if (e.response.data !== 'File is already added.') {
                showToast('مشکلی پیش اومده', 'error')
                console.log(e);
            }
        },
    })

    

    
    
    return {
        getAllPapers,
        gettingAllPapers,

        searchTags,
        searchingTags,

        addPaper, 
        addingPaper,

        searchPaper,
        searchingPaper,

        addRecentFile,
        addingRecentFile,
    }
}