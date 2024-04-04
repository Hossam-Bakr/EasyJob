import { createSlice } from "@reduxjs/toolkit";

const defaultEdietSlice=createSlice({
    name:"defaultEdiet",
    initialState:{
        defaultEdietPage:"info",
        defaultCompanyProfilePage:"overview"
    },

    reducers:{
            setDefaultEdietPage(state,action){
                state.defaultEdietPage=action.payload
            },
            setDefaultCompanyProfilePage(state,action){
                state.defaultCompanyProfilePage=action.payload
            },
    }
})


export default defaultEdietSlice;
export const edietActions=defaultEdietSlice.actions;