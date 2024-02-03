import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { DELETE_REQUEST, GET_REQUEST, POST_REQUEST } from "../constants";
import { DELETE_GROUP, GROUPS, UPDATE_GROUP } from "./endpoints";


export const GetLabGroupsAPI = apiRequestObject({
    url: GROUPS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const DeleteLabGroupAPI = apiRequestObject({
    url: DELETE_GROUP,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const UpdateLabGroupAPI = apiRequestObject({
    url: UPDATE_GROUP,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const CreateLabGroupAPI = apiRequestObject({
    url: GROUPS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})