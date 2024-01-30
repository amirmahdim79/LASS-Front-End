import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { READING_PAPERS, USER_TASK, USER_TASKS } from "./endpoints";


export const GetUserTasksAPI = apiRequestObject({
    url: USER_TASKS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetUserTaskAPI = apiRequestObject({
    url: USER_TASK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const CompleteReadingPapersAPI = apiRequestObject({
    url: READING_PAPERS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})