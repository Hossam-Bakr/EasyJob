import { createSlice } from "@reduxjs/toolkit";

let companySlice=createSlice({
    name:'companyNav',
    initialState:{
        isCompanyHome:false
    },
    reducers:{
        changeNavState(state,action){
            state.isCompanyHome=action.payload
        }
    }

});


export default companySlice;
export const companyActions= companySlice.actions;