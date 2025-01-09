import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";
import scanResults from "./scan/scanResSlice";
import userInfo from "./user/user";
import groupsReducer from "./slices/groupsSlice";
import serviceReducer from "./slices/serviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    groups: groupsReducer,
    services: serviceReducer,
    // TBD
    scanResults,
    userInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
