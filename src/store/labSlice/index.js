import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./constants";

const initialState = {
    Paths: null,
    Milestones: null,
    Students: null,
    CurrentMilestone: null,
    userTasks: [],
    Events: null,
    prevId: '',
    labId: '',
    labGroups: [],
    labStudentsTasks: [],
    labForums: undefined,
    forum: undefined,
    labGroupNewName: undefined,
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
        setLabGroups: (state, action) => {
            state.labGroups = action.payload
        },
        setLabForums: (state, action) => {
            state.labForums = action.payload
        },
        setForum: (state, action) => {
            state.forum = action.payload
        },
        setStudents: (state, action) => {
            state.Students = action.payload
        },
        setEvents: (state, action) => {
            state.Events = action.payload
        },
        setNewName: (state, action) => {
            state.labGroupNewName = action.payload
        },
        setUserTasks:  (state, action) => {
            state.userTasks = action.payload
        },
        setLabStudentsTasks:  (state, action) => {
            state.labStudentsTasks = action.payload
        },
    }
})

export const {  
    setMilestone, 
    setCurrentMilestone, 
    setPath, 
    setStudents, 
    setPrevInd, 
    setEvents, 
    setLabId, 
    setLabGroups,
    setLabForums,
    setForum,
    setNewName,
    setUserTasks,
    setLabStudentsTasks,
} = labSlice.actions;
