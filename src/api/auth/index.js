import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST, PATCH_REQUEST, DELETE_REQUEST } from "../constants";
import { AUTH_USER, AUTH_SUP } from "./endpoints";


export const AuthUserAPI = apiRequestObject({
    url: AUTH_USER,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const AuthSupAPI = apiRequestObject({
    url: AUTH_SUP,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})