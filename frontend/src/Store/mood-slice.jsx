import { createSlice } from "@reduxjs/toolkit";

const moodSlice= createSlice({
    name:'mood',
    initialState:{
        lightMood:true
    },
    reducers:{
        changeMood(state){
         state.lightMood=!state.lightMood
        }
    }
})

export const moodActions=moodSlice.actions;

export default moodSlice;