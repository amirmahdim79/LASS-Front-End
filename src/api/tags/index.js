import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST } from "../constants";
import { SEARCH_TAGS } from "./endpoints";


export const SearchTagsAPI = apiRequestObject({
    url: SEARCH_TAGS,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

