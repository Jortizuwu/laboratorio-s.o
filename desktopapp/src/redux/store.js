import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import processSlice from "./features/process";
import uiSlice from "./features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    ui: uiSlice,
    process: processSlice,
  },
});
