import { takeEvery, all } from "redux-saga/effects";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/ProductConstants";
import { CART_ADD_ITEM_REQUEST } from "../constants/CartConstants";
import { listProduct, detailProduct } from "./ProductActions.saga";
import { addToCart } from "./CartAction.saga";

function* watchListProduct() {
  yield takeEvery(PRODUCT_LIST_REQUEST, listProduct);
}

function* watchDetailProduct() {
  yield takeEvery(PRODUCT_DETAILS_REQUEST, detailProduct);
}

function* watchAddToCart() {
  yield takeEvery(CART_ADD_ITEM_REQUEST, addToCart);
}

export default function* rootSaga() {
  yield all([watchListProduct(), watchDetailProduct(), watchAddToCart()]);
}
