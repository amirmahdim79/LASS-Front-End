import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST } from "../constants";
import { GET_NOTIFICATIONS } from "./endpoints";


export const GetNotificationsAPI = apiRequestObject({
    url: GET_NOTIFICATIONS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})