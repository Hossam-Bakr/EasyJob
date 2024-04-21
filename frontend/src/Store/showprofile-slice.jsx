import { createSlice } from "@reduxjs/toolkit";

const showProfileSlice=createSlice({
  name:"showProfile",
  initialState:{
    isMyProfile:true,
  },
  reducers:{
    setIsMyProfile(state,action){
      state.isMyProfile=action.payload
    },
  }
})


export default showProfileSlice;
export const showProfileActions=showProfileSlice.actions