import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetAllPapersAPI, AddNewPaperAPI, SearchPaperAPI } from "api/files";
import { SearchTagsAPI } from "api/tags";
import { AddSupRecentFileAPI } from "api/sups";

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
            console.log("tags errrrrrrrrrrrrrr", e);
        },
    })

    const { pending: searchingPaper, request: searchPaper } = useAPI({
        apiMethod: SearchPaperAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            console.log("sarcg paper errrrrrrrrrrrrrr", e);
        },
    })

    const { pending: addingRecentFile, request: addRecentFile } = useAPI({
        apiMethod: AddSupRecentFileAPI,

        successCallback: (res) => {

        },
        
        failedCallback: (e) => {
            console.log("reeeeeeeeeeeccccccc", e);
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