import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { ADD_DOCS, GET_LAB_DOCS } from "./endpoints";


export const AddNewDocAPI = apiRequestObject({
    url: ADD_DOCS,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabDocsAPI = apiRequestObject({
    url: GET_LAB_DOCS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})