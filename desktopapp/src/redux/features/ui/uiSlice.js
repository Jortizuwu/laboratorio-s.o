import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
  withData: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeAndOpenModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
    setWithData: (state) => {
      state.withData = !state.withData;
    },
  },
});

export const { closeAndOpenModal, setWithData } = uiSlice.actions;

export default uiSlice.reducer;
