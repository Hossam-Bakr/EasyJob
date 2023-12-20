import { createSlice } from "@reduxjs/toolkit";


const initialState={
    darkMode: localStorage.getItem('darkMode') !== null ? JSON.parse(localStorage.getItem('darkMode')) : false,
}
const modeSlice= createSlice({
    name:'mode',
    initialState,
    reducers:{
        toggleMood(state){
         state.darkMode=!state.darkMode;
         localStorage.setItem('darkMode',JSON.stringify(state.darkMode));
        }
    }
})

export const modeAction=modeSlice.actions;
export default modeSlice;