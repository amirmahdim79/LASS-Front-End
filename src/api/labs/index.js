import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { GET_MY_LABS, CREATE_LAB, ENROLL_USER, SPECIFIC_LAB, LABS_STUDENT_INFO } from "./endpoints";


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

