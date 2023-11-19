import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { LAB_EVENTS } from "./endpoints";


export const GetLabEventsAPI = apiRequestObject({
    url: LAB_EVENTS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})
