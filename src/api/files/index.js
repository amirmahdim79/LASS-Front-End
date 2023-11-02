import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { FILES, SEARCH_PAPER } from "./endpoints";


export const GetAllPapersAPI = apiRequestObject({
    url: FILES,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const AddNewPaperAPI = apiRequestObject({
    url: FILES,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const SearchPaperAPI = apiRequestObject({
    url: SEARCH_PAPER,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})