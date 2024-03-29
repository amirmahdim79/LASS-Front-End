import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { GET_MY_LABS, CREATE_LAB, ENROLL_USER, SPECIFIC_LAB, LABS_STUDENT_INFO, GET_LABS_STUDENTS, GET_LEADERBOARD, GET_LABS_STUDENTS_TASKS, GET_PERMISSIONS, GET_LAB_ALUMNI } from "./endpoints";


export const GetMyLabsAPI = apiRequestObject({
    url: GET_MY_LABS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const CreateLabAPI = apiRequestObject({
    url: CREATE_LAB,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const EnrollUserAPI = apiRequestObject({
    url: ENROLL_USER,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const GetSpecificLabDataAPI = apiRequestObject({
    url: SPECIFIC_LAB,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabStudentInfoAPI = apiRequestObject({
    url: LABS_STUDENT_INFO,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabStudentsTasksAPI = apiRequestObject({
    url: GET_LABS_STUDENTS_TASKS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabStudentsAPI = apiRequestObject({
    url: GET_LABS_STUDENTS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLeaderboardAPI = apiRequestObject({
    url: GET_LEADERBOARD,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetPermissionsListAPI = apiRequestObject({
    url: GET_PERMISSIONS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabAlumniAPI = apiRequestObject({
    url: GET_LAB_ALUMNI,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

