import { createSlice } from "@reduxjs/toolkit";

let companySlice=createSlice({
    name:'companyNav',
    initialState:{
        isCompanyHome:false,
        changeNavContent:false
    },
    reducers:{
        changeNavState(state,action){
            state.isCompanyHome=action.payload.changeCompany;
            state.changeNavContent=action.payload.changeNav
        }
    }

});


export default companySlice;
export const companyActions= companySlice.actions;