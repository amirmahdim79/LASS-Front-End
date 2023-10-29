import { configureStore } from "@reduxjs/toolkit";
import { labSlice } from "./labSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        lab: labSlice.reducer,
    }
})