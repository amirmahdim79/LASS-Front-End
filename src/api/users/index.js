import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { POST_REQUEST } from "../constants";
import { CREATE_USER } from "./endpoints";


export const CreateUserAPI = apiRequestObject({
    url: CREATE_USER,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

