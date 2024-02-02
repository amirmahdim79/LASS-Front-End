import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { CREATE_PATH } from "./endpoints";


export const CreatePathAPI = apiRequestObject({
    url: CREATE_PATH,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})