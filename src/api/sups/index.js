import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { ADD_PERMISSIONS, SUPS_RECENT_FILES } from "./endpoints";


export const AddSupRecentFileAPI = apiRequestObject({
    url: SUPS_RECENT_FILES,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const AddPermissionToUserAPI = apiRequestObject({
    url: ADD_PERMISSIONS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})