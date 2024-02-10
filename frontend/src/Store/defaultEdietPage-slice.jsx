import { createSlice } from "@reduxjs/toolkit";

const defaultEdietSlice=createSlice({
    name:"defaultEdiet",
    initialState:{
        defaultEdietPage:"info"
    },

    reducers:{
            setDefaultEdietPage(state,action){
                state.defaultEdietPage=action.payload
            }
    }
})


export default defaultEdietSlice;
export const edietActions=defaultEdietSlice.actions;