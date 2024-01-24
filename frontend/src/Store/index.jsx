import {configureStore} from '@reduxjs/toolkit';
import userInfoSlice from './userInfo-slice';
import modeSlice from './mood-slice';
import companySlice from './companyNav-slice';

const store = configureStore({
    reducer:{mode:modeSlice.reducer,userInfo:userInfoSlice.reducer,companyNav:companySlice.reducer}
})

export default store; 