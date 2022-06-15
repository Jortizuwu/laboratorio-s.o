import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  process: [],
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    addProcess: (state, action) => {
      state.process = [...action.payload];
    },
  },
});

export const { addProcess } = processSlice.actions;

export default processSlice.reducer;
