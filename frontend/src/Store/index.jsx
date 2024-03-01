import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfo-slice";
import modeSlice from "./mood-slice";
import companySlice from "./companyNav-slice";
import defaultEdietSlice from "./defaultEdietPage-slice";
import profileSlice from "./profileInfo-slice";
import categorySlice from "./category-slice";


const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
    userInfo: userInfoSlice.reducer,
    companyNav: companySlice.reducer,
    defaultEdiet: defaultEdietSlice.reducer,
    profileInfo:profileSlice.reducer,
    category:categorySlice.reducer
  },
});

export default store;
