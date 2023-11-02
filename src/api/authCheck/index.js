import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST } from "../constants";
import { AUTH_CHECK, AUTH_CHECK_SUP } from "./endpoints";


export const AuthCheckAPI = apiRequestObject({
    url: AUTH_CHECK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const AuthCheckSupAPI = apiRequestObject({
    url: AUTH_CHECK_SUP,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

