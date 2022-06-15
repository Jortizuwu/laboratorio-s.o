import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeAndOpenModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const { closeAndOpenModal } = uiSlice.actions;

export default uiSlice.reducer;
