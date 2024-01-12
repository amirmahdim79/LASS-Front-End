import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { DELETE_REQUEST, GET_REQUEST, POST_REQUEST } from "../constants";
import { FORUM_DATA, LAB_FORUMS, SEND_MSG } from "./endpoints";


export const GetLabForumsAPI = apiRequestObject({
    url: LAB_FORUMS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetOneForumDataAPI = apiRequestObject({
    url: FORUM_DATA,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const SendMsgAPI = apiRequestObject({
    url: SEND_MSG,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})