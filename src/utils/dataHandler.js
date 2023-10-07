import { $axios } from "API/axios"
import { GET_TOKEN } from "./tokenHandler"

export const COLLECT = (action, payload = {}) => {
    if (action) {
        $axios.post(action, payload, {
            headers: {
                'x-auth-token': GET_TOKEN()
            }
        })
    }
}