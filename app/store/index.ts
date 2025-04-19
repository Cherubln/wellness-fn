import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";

import groupsReducer from "./slices/groupsSlice";
import serviceReducer from "./slices/serviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    groups: groupsReducer,
    services: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
