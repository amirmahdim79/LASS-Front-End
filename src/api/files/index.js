import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { FILES, FIND_FILE, SEARCH_PAPER } from "./endpoints";


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

export const FindFileAPI = apiRequestObject({
    url: FIND_FILE,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})