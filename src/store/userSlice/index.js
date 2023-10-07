import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./constants";

const initialState = {
    user: null,
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: CONSTANTS.USER,
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user
            state.isLoggedIn = true
        },
        clearUser: (state, action) => {
            state.user = null
            state.isLoggedIn = false
        },
    }
    
})