import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todosSlice";
import users from "../features/UsersSlice";
import application from "../features/applicationSlice";
export const store = configureStore({
  reducer: {
    todoReducer,
    users,
    application, 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
