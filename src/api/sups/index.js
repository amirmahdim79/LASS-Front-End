import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { SUPS_RECENT_FILES } from "./endpoints";


export const AddSupRecentFileAPI = apiRequestObject({
    url: SUPS_RECENT_FILES,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

