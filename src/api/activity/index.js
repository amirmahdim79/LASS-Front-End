import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST, PATCH_REQUEST, DELETE_REQUEST } from "../constants";
import { MY_ACTIVITY, USER_ACTIVITY } from "./endpoints";


export const GetUserActivitiesAPI = apiRequestObject({
    url: USER_ACTIVITY,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetMyActivitiesAPI = apiRequestObject({
    url: MY_ACTIVITY,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

