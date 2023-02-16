import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setActiveTestRuns: (state, { payload }) => {
            // state.activeTestRuns = payload;
        },
        setCurrentTab: (state, { payload }) => {
            state.currentTab = payload;
            console.log("Coming to current tab");
        },
    },
});

export const {
    setActiveTestRuns,
    setCurrentTab
} = settingsSlice.actions;


export default settingsSlice.reducer;