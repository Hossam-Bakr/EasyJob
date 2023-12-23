import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice=createSlice({
    name:'userInfo',
    initialState:{
        data:null,
        isLogin:false
    },
    reducers:{
        setUserInfo(state,action){
            state.data=action.payload;
        },
        setIsLogin(state,action){
            state.isLogin=action.payload
        }
    }
})

export default userInfoSlice;
export const userActions=userInfoSlice.actions;