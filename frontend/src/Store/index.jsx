import {configureStore} from '@reduxjs/toolkit';
import moodSlice from './mood-slice';
import userInfoSlice from './userInfo-slice';

const store = configureStore({
    reducer:{mood:moodSlice.reducer,userInfo:userInfoSlice.reducer}
})

export default store; 