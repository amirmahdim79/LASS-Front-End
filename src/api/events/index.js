import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { LAB_EVENTS, EVENTS, DELETE_EVENT } from "./endpoints";


export const GetLabEventsAPI = apiRequestObject({
    url: LAB_EVENTS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const CreateLabEventAPI = apiRequestObject({
    url: EVENTS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const DeleteLabEventAPI = apiRequestObject({
    url: DELETE_EVENT,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

