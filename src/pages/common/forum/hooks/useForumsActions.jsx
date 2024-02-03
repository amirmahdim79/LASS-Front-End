import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";
import { GetMyLabsAPI } from "api/labs"
import { GetOneForumDataAPI } from "api/forum";
import { SendMsgAPI } from "api/forum";
import { GetLabForumsAPI } from "api/forum";
import { UpdatePresenceFormAPI } from "api/presenceForm";
import { CreateForumAPI } from "api/forum";

export const useForumsActions = () => {
    const { showToast } = useToast();

    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: gettingLabForums, request: getLabForums } = useAPI({
        apiMethod: GetLabForumsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
        initialLoading: true
    })

    const { pending: gettingOneForum, request: getOneForum } = useAPI({
        apiMethod: GetOneForumDataAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: sendingMsgInForum, request: sendMsgInForum } = useAPI({
        apiMethod: SendMsgAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: updatingPresenceForm, request: updatePresenceForm } = useAPI({
        apiMethod: UpdatePresenceFormAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: forumCreation, request: createForum } = useAPI({
        apiMethod: CreateForumAPI,

        successCallback: (res) => {
            showToast('فروم با موفقیت ساخته شد', 'success')
        },
        
        failedCallback: (e) => {
        },
    })

    
    return {
        getMyLabs,
        gettingMyLabs,

        getOneForum,
        gettingOneForum,

        sendMsgInForum,
        sendingMsgInForum,

        getLabForums,
        gettingLabForums,

        updatePresenceForm,
        updatingPresenceForm,

        createForum,
        forumCreation,
    }
}