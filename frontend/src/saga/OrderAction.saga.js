import { call, put } from "redux-saga/effects";
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_EMPTY,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
} from "../constants/OrderConstants";
import store from "../store";
import axios from "axios";

const apiCreateOrder = async (payload) => {
  const {
    userSignin: { userInfo },
  } = store.getState();
  return await axios.post(
    "/api/orders",
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
};

const apiDetailOrder = async (orderId) => {
  const {
    userSignin: { userInfo },
  } = store.getState();
  return await axios.get(
    `/api/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
};

export function* createOrder({ payload }) {
  try {
    const { data } = yield call(apiCreateOrder, payload);
    yield put({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    yield put({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    yield put({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


export function* detailOrder({ payload }) {
  try {
    const { data } = yield call(apiDetailOrder, payload);
    yield put({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
