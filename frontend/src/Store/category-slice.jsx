import { createSlice } from '@reduxjs/toolkit';

const categorySlice=createSlice({
    name:'category',
    initialState:{
        categories:null,
        industries:null,
        skills:null
    },
    reducers:{
        setCategories(state,action){
            state.categories=action.payload;
        },
        setIndustries(state,action){
            state.industries=action.payload
        },
        setSkills(state,action){
            state.skills=action.payload;
        }
    }
})

export default categorySlice;
export const categoryActions=categorySlice.actions;