import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{
        data:{
            value:null,
            type:null
        },
    },
    reducers:{
        setFilterationValue(state,action){
            state.data.value=action.payload.value        
            state.data.type=action.payload.type        
        }
    }

})

export default filterSlice;
export const filterActions=filterSlice.actions;
