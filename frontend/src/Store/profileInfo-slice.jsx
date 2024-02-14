import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profileInfo",
    initialState:{
        data:null,
    },
    reducers:{
        setProfileInfo(state,action){
            state.data=action.payload 
            state.loading = false;          
        },
    }

})

export default profileSlice;
export const profileActions=profileSlice.actions;
