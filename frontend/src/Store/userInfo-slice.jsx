import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice=createSlice({
    name:'userInfo',
    initialState:{
        data:null,
        isLogin:false,
        role:"",
        token:""
    },
    reducers:{
        setUserInfo(state,action){
            state.data=action.payload;
        },
        setIsLogin(state,action){
            state.isLogin=action.payload
        },
        setRole(state,action){
            state.role=action.payload
        },
        setToken(state,action){
            state.token=action.payload
        }
    }
})

export default userInfoSlice;
export const userActions=userInfoSlice.actions;