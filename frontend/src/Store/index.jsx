import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfo-slice";
import companySlice from "./companyNav-slice";
import defaultEdietSlice from "./defaultEdietPage-slice";
import profileSlice from "./profileInfo-slice";
import categorySlice from "./category-slice";
import savedJobsSLice from "./savedJobs-slice";


const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    companyNav: companySlice.reducer,
    defaultEdiet: defaultEdietSlice.reducer,
    profileInfo:profileSlice.reducer,
    category:categorySlice.reducer,
    savedJobs:savedJobsSLice.reducer
  },
});

export default store;
