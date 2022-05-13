import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    listFile: {
      list: null,
      isFetching: false,
      error: false,
    },
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
    getListFailed: (state) => {
      state.listFile.isFetching = false;
      state.listFile.error = true;
    },
  },
});

export const { getListStart, getListSuccess, getListFailed } =
  fileSlice.actions;

export default fileSlice.reducer;
