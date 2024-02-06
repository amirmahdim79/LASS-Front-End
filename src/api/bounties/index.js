import { apiRequestObject } from "..";
import { TRANSFORMER } from "./transformer"
import { GET_REQUEST, POST_REQUEST } from "../constants";
import { ADD_BOUNTY, DEL_BOUNTY, GET_BOUNTY_INFO, GET_LAB_BOUNTIES } from "./endpoints";


export const AddNewBountyAPI = apiRequestObject({
    url: ADD_BOUNTY,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const DeleteBountyAPI = apiRequestObject({
    url: DEL_BOUNTY,
    requestType: POST_REQUEST,
    transformer: TRANSFORMER,
})

export const GetLabBountiesAPI = apiRequestObject({
    url: GET_LAB_BOUNTIES,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})

export const GetBountyInfoAPI = apiRequestObject({
    url: GET_BOUNTY_INFO,
    requestType: GET_REQUEST,
    transformer: TRANSFORMER,
})