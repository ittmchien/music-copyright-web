import Axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "./adminSlice";
import {
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
  updateProfileFailed,
  updateProfileStart,
  updateProfileSuccess,
} from "./userSlice";
import { getListFailed, getListStart, getListSuccess } from "./fileSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await Axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await Axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    loginUser(user, dispatch);
    navigate("/");
  } catch (error) {
    dispatch(registerFailed(error.response.data));
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/admin/users/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailed(error.response.data));
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/admin/users/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data));
  }
};

export const logoutUser = async (
  accessToken,
  dispatch,
  id,
  navigate,
  axiosJWT
) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(logoutFailed(error.response.data));
  }
};

export const updateUser = async (accessToken, dispatch, id, user, axiosJWT) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosJWT.put("/v1/admin/users/" + id, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess(res.data));
    getAllUsers(accessToken, dispatch, axiosJWT);
  } catch (error) {
    dispatch(updateUserFailed(error.response.data));
  }
};

export const getUserProfile = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(getProfileStart());
  try {
    const res = await axiosJWT.get("/v1/user/profile/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getProfileSuccess(res.data));
  } catch (error) {
    dispatch(getProfileFailed(error.response.data));
  }
};

export const updateProfile = async (
  accessToken,
  dispatch,
  id,
  user,
  navigate,
  axiosJWT
) => {
  dispatch(updateProfileStart());
  try {
    const res = await axiosJWT.put("/v1/user/profile/update/" + id, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateProfileSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data));
  }
};

export const getListFile = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getListStart());
  try {
    const res = await axiosJWT.get("/v1/upload/listfile", {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(getListSuccess(res.data));
  } catch (error) {
    dispatch(getListFailed(error.response.data));
  }
};
