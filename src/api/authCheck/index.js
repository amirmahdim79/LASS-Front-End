import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST } from "../constants";
import { AUTH_CHECK } from "./endpoints";


export const AuthCheckAPI = apiRequestObject({
    url: AUTH_CHECK,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

