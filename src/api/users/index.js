import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { CREATE_USER, UPDATE_USER_INFO, UPDATE_USER_PROFILE_PICTURE, USER_RECENT_FILES } from "./endpoints";


export const CreateUserAPI = apiRequestObject({
    url: CREATE_USER,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const AddUserRecentFileAPI = apiRequestObject({
    url: USER_RECENT_FILES,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const UpdateUserInfoAPI = apiRequestObject({
    url: UPDATE_USER_INFO,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const UpdateUserProfilePicAPI = apiRequestObject({
    url: UPDATE_USER_PROFILE_PICTURE,
    requestType: POST_REQUEST,
    requestConfig:{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
})
