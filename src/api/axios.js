import axios from "axios";
import { toast } from "react-toastify";
import { SET_TOKEN } from "../utils/tokenHandler";

const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT,
    timeout: 600000,
    withCredentials: true,
})

const onResponseErrorHandler = (error) => {
    const status = error.response?.status;

    if (status === 500) console.error('مشکل سرور');
    if (status === 401) { 
        console.error('مشکل سرور')
        toast.error('دوباره وارد شوید')
    }
    if (!status) console.error('مشکل شبکه');

    if (error.response?.data?.message && status !== 401) console.error(error.response.data?.message);

    return Promise.reject(error);
}

const onRequestErrorHandler = (error) => {
    return Promise.reject(error);
};

$axios.interceptors.response.use((response) => {
    if (response.headers['x-auth-token'] && process.env.REACT_APP_USE_LOCAL_TOKEN === 'y') SET_TOKEN(response.headers['x-auth-token'])
    return response;
}, onResponseErrorHandler);

const serviceGet = ({ url, config }) => {
    return $axios.get(url, config);
};

const servicePost = ({ url, config, data }) => {
    return $axios.post(url, data, config);
};

const serviceDelete = async ({ url, config }) => {
    return await $axios.post(url, {}, config);
};
const servicePatch = async ({ url, config, data }) => {
    return await $axios.patch(url, data, config);
};

const servicePut = $axios.put;

export { servicePost, serviceGet, servicePatch, servicePut, serviceDelete, $axios };