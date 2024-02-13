import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./constants";

const initialState = {
    user: null,
    permissions: [],
    searchedValue: '',
    navSearchedValue: null,
    isLoggedIn: false,
    articles: [],
    currentTime: '',
    supHasLab: null,
}

export const userSlice = createSlice({
    name: CONSTANTS.USER,
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        clearUser: (state, action) => {
            state.user = null
            state.isLoggedIn = false
        },
        setArticles: (state, action) => {
            state.articles = action.payload;
        },
        setSearchedValue: (state, action) => {
            state.searchedValue = action.payload
        },
        setNavSearchedValue: (state, action) => {
            state.navSearchedValue = action.payload
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload
        },
        setSupHasLab: (state, action) => {
            state.supHasLab = action.payload
        },
    }
})

export const { 
    addUser, clearUser, setArticles, setSearchedValue, 
    setNavSearchedValue, setPermissions, setCurrentTime,
    setSupHasLab
} = userSlice.actions;
