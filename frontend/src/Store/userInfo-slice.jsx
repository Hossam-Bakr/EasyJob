import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice=createSlice({
    name:'userInfo',
    initialState:{
        data:{},
        token:"",
        isLogin:false
    },
    reducers:{
        setUserInfo(state,action){
            state.data=action.payload.data;
            state.token=action.payload.token;
        },
        setIsLoginState(state,action){
            state.isLogin=action.payload
        }
    }
})

export default userInfoSlice;
export const userActions=userInfoSlice.actions;