import { takeEvery, all } from "redux-saga/effects";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/ProductConstants";
import { listProduct, detailProduct } from "./ProductActions.saga";

function* watchListProduct() {
  yield takeEvery(PRODUCT_LIST_REQUEST, listProduct);
}

function* watchDetailProduct() {
  yield takeEvery(PRODUCT_DETAILS_REQUEST, detailProduct);
}

export default function* rootSaga() {
  yield all([watchListProduct(), watchDetailProduct()]);
}
