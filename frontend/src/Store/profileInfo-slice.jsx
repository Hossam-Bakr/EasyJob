import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profileInfo",
    initialState:{
        data:null,
        mainData:null
    },
    reducers:{
        setProfileInfo(state,action){
            state.data=action.payload        
        },
        setProfileMainInfo(state,action){
            state.mainData=action.payload        
        },
    }

})

export default profileSlice;
export const profileActions=profileSlice.actions;
