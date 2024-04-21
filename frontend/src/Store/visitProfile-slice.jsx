import { createSlice } from "@reduxjs/toolkit";

const visitProfileSlice=createSlice({
    name:"visitProfile",
    initialState:{
        data:null,
    },
    reducers:{
        setProfileInfo(state,action){
            state.data=action.payload        
        },
    }

})

export default visitProfileSlice;
export const visitProfileActions=visitProfileSlice.actions;
