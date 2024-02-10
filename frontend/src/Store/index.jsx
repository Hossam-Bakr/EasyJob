import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfo-slice";
import modeSlice from "./mood-slice";
import companySlice from "./companyNav-slice";
import defaultEdietSlice from "./defaultEdietPage-slice";

const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
    userInfo: userInfoSlice.reducer,
    companyNav: companySlice.reducer,
    defaultEdiet: defaultEdietSlice.reducer,
  },
});

export default store;
