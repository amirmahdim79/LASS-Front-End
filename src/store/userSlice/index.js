import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./constants";

const initialState = {
    user: null,
    searchedValue: '',
    navSearchedValue: null,
    isLoggedIn: false,
    articles: [
        {
            "name": "راضیه اسماعیلی - 910198243.pdf",
            "size": 107415,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "راضیه اسماعیلی - 910198243.pdf",
            "size": 107415,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "SakhaHelpPersonInfoSakhaHelpPersonInfoSakhaHelpPersonInfoSakhaHelpPersonInfo.pdf",
            "size": 1764870,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "Seminar_reports1.docx",
            "size": 14480,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "R.jpg",
            "size": 297613,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "slr-camera-xxl.png",
            "size": 7062,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        },
        {
            "name": "pass.txt",
            "size": 40,
            "tags": [
                "#AI",
                "#Machine_Learning",
                "#Gamification",
                "#elearning"
            ]
        }
    ],
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
            state.articles = [...state.articles,  action.payload]
        },
        setSearchedValue: (state, action) => {
            state.searchedValue = action.payload
        },
        setNavSearchedValue: (state, action) => {
            state.navSearchedValue = action.payload
        },
    }
})

export const { addUser, clearUser, setArticles, setSearchedValue, setNavSearchedValue } = userSlice.actions;
