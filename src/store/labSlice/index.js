import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./constants";

const initialState = {
    Paths: null,
    Milestones: null,
    Students: null,
    CurrentMilestone: null,
    Events: null,
    prevId: '',
    labId: '',
}

export const labSlice = createSlice({
    name: CONSTANTS.LAB,
    initialState,
    reducers: {
        setMilestone: (state, action) => {
            state.Milestones = action.payload
        },
        setCurrentMilestone: (state, action) => {
            state.CurrentMilestone = action.payload
        },
        setPath: (state, action) => {
            state.Paths = action.payload
        },
        setPrevInd: (state, action) => {
            state.prevId = action.payload
        },
        setLabId: (state, action) => {
            state.labId = action.payload
        },
        setStudents: (state, action) => {
            state.Students = action.payload
        },
        setEvents: (state, action) => {
            state.Events = action.payload
        },
    }
})

export const {  setMilestone, setCurrentMilestone, setPath, setStudents, setPrevInd, setEvents, setLabId } = labSlice.actions;
