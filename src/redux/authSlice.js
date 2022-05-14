import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    msg: "",
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
      state.msg = "";
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.msg = "";
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.msg = action.payload;
    },
    clearAuthMessage: (state) => {
      state.msg = "";
    },

    registerStart: (state) => {
      state.register.isFetching = true;
      state.msg = "";
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
      state.msg = "";
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      state.msg = action.payload;
    },

    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerSuccess,
  registerFailed,
  registerStart,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  clearAuthMessage
} = authSlice.actions;

export default authSlice.reducer;
