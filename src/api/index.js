import { GET_TOKEN } from "../utils/tokenHandler";
import { serviceDelete, serviceGet, servicePatch, servicePost } from "./axios";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "./constants";

const getPromiseBasedOnRequestType = {
    [GET_REQUEST]: ({ apiMethod, finalUrl, inputData, finalConfig, transformer }) => {
        return apiMethod({
            url: finalUrl,
            config: { ...finalConfig, params: inputData },
        }).then(transformer || ((result) => result));
    },
    [POST_REQUEST]: ({ apiMethod, finalUrl, inputData, finalConfig, transformer }) => {
        return apiMethod({
            url: finalUrl,
            config: finalConfig,
            data: inputData,
        }).then(transformer || ((result) => result));
    },
    [DELETE_REQUEST]: ({ apiMethod, finalUrl, inputData, finalConfig, transformer }) => {
        return apiMethod({
            url: finalUrl,
            config: { ...finalConfig, data: inputData },
        }).then(transformer || ((result) => result));
    },
    [PATCH_REQUEST]: ({ apiMethod, finalUrl, inputData, finalConfig, transformer }) => {
        return apiMethod({
            url: finalUrl,
            config: finalConfig,
            data: inputData,
        }).then(transformer || ((result) => result));
    },
};

export const apiRequestObject = ({
    url,
    requestType = GET_REQUEST,
    requestConfig = {},
    inputTransformer = (data) => data,
    transformer = (data) => data,
    getAPI = serviceGet,
    postAPI = servicePost,
    deleteAPI = serviceDelete,
    patchAPI = servicePatch,
}) => {
    const abortController = new AbortController();

    const APIMethodsBasedOnType = {
        [GET_REQUEST]: getAPI,
        [POST_REQUEST]: postAPI,
        [DELETE_REQUEST]: deleteAPI,
        [PATCH_REQUEST]: patchAPI,
    };

    function apiCall(data, urlParams) {
        const finalConfig = {
            ...(requestConfig || {}),
            signal: abortController.signal,
            headers: {
                'x-auth-token': GET_TOKEN()
            }
        };

        const finalUrl = url + (urlParams ?? '')
        const inputData = inputTransformer(data);
        return getPromiseBasedOnRequestType[requestType]({
            apiMethod: APIMethodsBasedOnType[requestType],
            finalUrl,
            inputData,
            finalConfig,
            transformer,
        });
    }

    apiCall.cancel = () => abortController.abort()
    apiCall.onUploadProgress = requestConfig?.onUploadProgress;
    apiCall.url = url;

    return apiCall;
}