import { isExpired } from "react-jwt";

export const GET_TOKEN = () => {
    let token = localStorage.getItem("user-auth");

    if (!isExpired(token)) {
        return token
    }

    localStorage.removeItem("user-auth");
    return ''
}

export const SET_TOKEN = (token) => {
    localStorage.setItem("user-auth", token);

    if (!isExpired(token)) {
        return token
    }

    localStorage.removeItem("user-auth");
    return ''
}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem("user-auth");
    return ''
}