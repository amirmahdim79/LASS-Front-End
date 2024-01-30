import { GetLabEventsAPI } from "api/events";
import { EnrollUserAPI } from "api/labs";
import { GetLabStudentsTasksAPI } from "api/labs";
import { GetLabStudentInfoAPI } from "api/labs";
import { GetMyLabsAPI, CreateLabAPI } from "api/labs";
import useAPI from "hooks/useAPI"
import useToast from "hooks/useToast";

export const useLabActions = () => {
    const { showToast } = useToast();

    const { pending: gettingMyLabs, request: getMyLabs } = useAPI({
        apiMethod: GetMyLabsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: labCreation, request: createLabs } = useAPI({
        apiMethod: CreateLabAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.log(e);
        },
    })

    const { pending: userEnrollment, request: enrollUser } = useAPI({
        apiMethod: EnrollUserAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
            console.log(e);
            if (e.response.data === 'User already enrolled') showToast('کاربر قبلاً ثبت نام کرده است', 'error')
            else if (e.response.data === 'Student not found.') showToast('کاربر مورد نظر یافت نشد', 'error')
            
        },
    })

    const { pending: gettingLabEvents, request: getLabEvents } = useAPI({
        apiMethod: GetLabEventsAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: gettingLabStudentInfo, request: getLabStudentInfo } = useAPI({
        apiMethod: GetLabStudentInfoAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })

    const { pending: gettingLabStudentsTasks, request: getLabStudentsTasks } = useAPI({
        apiMethod: GetLabStudentsTasksAPI,

        successCallback: (res) => {
        },
        
        failedCallback: (e) => {
        },
    })
    
    
    
    return {
        getMyLabs,
        gettingMyLabs,

        createLabs,
        labCreation,

        enrollUser,
        userEnrollment,

        getLabEvents,
        gettingLabEvents,

        getLabStudentInfo,
        gettingLabStudentInfo,

        getLabStudentsTasks,
        gettingLabStudentsTasks,
    }
}