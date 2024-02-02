import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { ACCEPT_TASK, MILESTONE_TASK, READING_PAPERS, SUPS_TASK, SUPS_TASKS, USER_TASK, USER_TASKS } from "./endpoints";


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

export const GetMilestoneTaskInfoAPI = apiRequestObject({
    url: MILESTONE_TASK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetSupsTasksAPI = apiRequestObject({
    url: SUPS_TASKS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetSupsTaskAPI = apiRequestObject({
    url: SUPS_TASK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const AcceptSupsTaskAPI = apiRequestObject({
    url: ACCEPT_TASK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})