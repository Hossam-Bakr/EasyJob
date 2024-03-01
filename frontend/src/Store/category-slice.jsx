import { createSlice } from '@reduxjs/toolkit';

const categorySlice=createSlice({
    name:'category',
    initialState:{
        categories:null,
        industries:null,
    },
    reducers:{
        setCategories(state,action){
            state.categories=action.payload;
        },
        setIndustries(state,action){
            state.industries=action.payload
        },
    }
})

export default categorySlice;
export const categoryActions=categorySlice.actions;