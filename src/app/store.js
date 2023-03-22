import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import searchReducer from "../features/tasks/searchSlice";

const store = configureStore({
  reducer: {
    taskReducer: taskReducer,
    searchReducer: searchReducer,
  },
});

export default store;
