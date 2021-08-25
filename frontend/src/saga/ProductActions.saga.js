import { call, put } from "redux-saga/effects";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/ProductConstants";
import axios from "axios";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const apiListProducts = async () => {
  return await axios.get("/api/products");
};

const apiDetailProduct = async (payload) => {
  return await axios.get(`/api/products/${payload}`);
};

export function* listProduct() {
  // yield delay(1000);
  try {
    const { data } = yield call(apiListProducts);

    yield put({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
}

export function* detailProduct({payload}) {
  try {
    const { data } = yield call(apiDetailProduct, payload);

    yield put({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    yield put({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.reponse && err.reponse.data.message
          ? err.reponse.data.message
          : err.message,
    });
  }
}
