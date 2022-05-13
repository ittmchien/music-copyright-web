import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      user: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getProfileStart: (state) => {
      state.profile.isFetching = true;
    },
    getProfileSuccess: (state, action) => {
      state.profile.isFetching = false;
      state.profile.user = action.payload;
      state.profile.error = false;
    },
    getProfileFailed: (state) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },

    updateProfileStart: (state) => {
      state.profile.isFetching = true;
    },
    updateProfileSuccess: (state, action) => {
      state.profile.isFetching = false;
      state.profile.user = action.payload;
      state.profile.error = false;
    },
    updateProfileFailed: (state, action) => {
      state.profile.isFetching = false;
      state.profile.error = true;
    },
  },
});

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileFailed,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
} = userSlice.actions;
export default userSlice.reducer;
