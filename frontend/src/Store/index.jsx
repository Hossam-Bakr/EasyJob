import {configureStore} from '@reduxjs/toolkit';
import userInfoSlice from './userInfo-slice';
import modeSlice from './mood-slice';

const store = configureStore({
    reducer:{mode:modeSlice.reducer,userInfo:userInfoSlice.reducer}
})

export default store; 