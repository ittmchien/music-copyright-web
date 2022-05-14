import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    listFile: {
      list: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getListStart: (state) => {
      state.listFile.isFetching = true;
    },
    getListSuccess: (state, action) => {
      state.listFile.isFetching = false;
      state.listFile.list = action.payload;
      state.listFile.error = false;
    },
    getListFailed: (state, action) => {
      state.listFile.isFetching = false;
      state.listFile.error = true;
      state.msg = action.payload;
    },
    clearFileMessage: (state) => {
      state.msg = "";
    },
  },
});

export const { getListStart, getListSuccess, getListFailed,clearFileMessage } =
  fileSlice.actions;

export default fileSlice.reducer;
