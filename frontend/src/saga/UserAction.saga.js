import { call, put } from "redux-saga/effects";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/UserConstants";
import store from "../store";
import axios from "axios";

const apiSignin = async (payload) => {
  return await axios.post("/api/users/signin", {
    email: payload.email,
    password: payload.password,
  });
};

const apiRegister = async (payload) => {
  return await axios.post("/api/users/register", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });
};

const apiDetailUser = async (userId) => {
  const {
    userSignin: { userInfo },
  } = store.getState();
  return await axios.get(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
};

const apiUpdateUserProfile = async (payload) => {
  const {
    userSignin: { userInfo },
  } = store.getState();
  return await axios.put("/api/users/profile", payload, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
};

export function* register({ payload }) {
  try {
    const { data } = yield call(apiRegister, payload);
    yield put({ type: USER_REGISTER_SUCCESS, payload: data });
    yield put({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    yield put({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export function* signin({ payload }) {
  try {
    const { data } = yield call(apiSignin, payload);
    yield put({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    yield put({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export function* signout() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  yield put({ type: USER_SIGNOUT });
}

export function* detailUser({ payload }) {
  try {
    const { data } = yield call(apiDetailUser, payload);
    yield put({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export function* updateUserProfile({ payload }) {
  try {
    const { data } = yield call(apiUpdateUserProfile, payload);
    yield put({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    yield put({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    yield put({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
