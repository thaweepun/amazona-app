import { call, put } from "redux-saga/effects";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} from "../constants/UserConstants";
import axios from "axios";

const apiSignin = async (payload) => {
  return await axios.post("/api/users/signin", {
    email: payload.email,
    password: payload.password,
  });
};

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
  yield put({ type: USER_SIGNOUT });
}
