import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { DELETE_REQUEST, GET_REQUEST, POST_REQUEST } from "../constants";
import { PRESENCE_FORM } from "./endpoints";


export const UpdatePresenceFormAPI = apiRequestObject({
    url: PRESENCE_FORM,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})