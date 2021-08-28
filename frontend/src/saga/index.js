import { takeEvery, all } from "redux-saga/effects";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/ProductConstants";
import {
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
} from "../constants/CartConstants";
import {
  USER_REGISTER_REQUEST,
  USER_SIGNIN_REQUEST,
  USER_SIGNOUT_REQUEST,
} from "../constants/UserConstants";

import { listProduct, detailProduct } from "./ProductActions.saga";
import { addToCart, removeFromCart, saveShippingAddress } from "./CartAction.saga";
import { register, signin, signout } from "./UserAction.saga";

function* watchListProduct() {
  yield takeEvery(PRODUCT_LIST_REQUEST, listProduct);
}

function* watchDetailProduct() {
  yield takeEvery(PRODUCT_DETAILS_REQUEST, detailProduct);
}

function* watchAddToCart() {
  yield takeEvery(CART_ADD_ITEM_REQUEST, addToCart);
}

function* watchRemoveFromCart() {
  yield takeEvery(CART_REMOVE_ITEM_REQUEST, removeFromCart);
}

function* watchSignin() {
  yield takeEvery(USER_SIGNIN_REQUEST, signin);
}

function* watchSignout() {
  yield takeEvery(USER_SIGNOUT_REQUEST, signout);
}

function* watchRegister() {
  yield takeEvery(USER_REGISTER_REQUEST, register);
}

function* watchSaveShippingAddress() {
  yield takeEvery(CART_SAVE_SHIPPING_ADDRESS_REQUEST, saveShippingAddress);
}

export default function* rootSaga() {
  yield all([
    watchListProduct(),
    watchDetailProduct(),
    watchAddToCart(),
    watchRemoveFromCart(),
    watchSignin(),
    watchSignout(),
    watchRegister(),
    watchSaveShippingAddress(),
  ]);
}
