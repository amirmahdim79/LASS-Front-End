import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { ADD_PERMISSIONS, ADD_SAND, ADD_SMARTIES, CREATE_SUPS, SUPS_RECENT_FILES } from "./endpoints";


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

export const CreateSupsAPI = apiRequestObject({
    url: CREATE_SUPS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const AddSandAPI = apiRequestObject({
    url: ADD_SAND,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const AddSmartiesAPI = apiRequestObject({
    url: ADD_SMARTIES,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})
