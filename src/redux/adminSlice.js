import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
      state.users.error = false;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    updateUserStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.user = action.payload;
      state.users.error = false;
    },
    updateUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
      state.users.error = false;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
    clearAdminMessage: (state) => {
      state.msg = "";
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  clearAdminMessage
} = adminSlice.actions;
export default adminSlice.reducer;
