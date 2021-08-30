import { takeEvery, all } from "redux-saga/effects";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
} from "../constants/ProductConstants";
import {
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM_REQUEST,
  CART_SAVE_PAYMENT_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
} from "../constants/CartConstants";
import {
  USER_DETAILS_REQUEST,
  USER_REGISTER_REQUEST,
  USER_SIGNIN_REQUEST,
  USER_SIGNOUT_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
} from "../constants/UserConstants";

import { listProduct, detailProduct } from "./ProductActions.saga";
import {
  addToCart,
  removeFromCart,
  savePayment,
  saveShippingAddress,
} from "./CartAction.saga";
import { detailUser, register, signin, signout, updateUserProfile } from "./UserAction.saga";
import {
  ORDER_CREATE_REQUEST,
  ORDER_DETAIL_REQUEST,
  ORDER_MINE_LIST_REQUEST,
  ORDER_PAY_REQUEST,
} from "../constants/OrderConstants";
import {
  createOrder,
  detailOrder,
  listOrderMine,
  payOrder,
} from "./OrderAction.saga";

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

function* watchSavePayment() {
  yield takeEvery(CART_SAVE_PAYMENT_REQUEST, savePayment);
}

function* watchCreateOrder() {
  yield takeEvery(ORDER_CREATE_REQUEST, createOrder);
}

function* watchDetailOrder() {
  yield takeEvery(ORDER_DETAIL_REQUEST, detailOrder);
}

function* watchPayOrder() {
  yield takeEvery(ORDER_PAY_REQUEST, payOrder);
}

function* watchListOrderMine() {
  yield takeEvery(ORDER_MINE_LIST_REQUEST, listOrderMine);
}

function* watchDetailUser() {
  yield takeEvery(USER_DETAILS_REQUEST, detailUser);
}

function* watchUpdateUserProfile() {
  yield takeEvery(USER_UPDATE_PROFILE_REQUEST, updateUserProfile);
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
    watchSavePayment(),
    watchCreateOrder(),
    watchDetailOrder(),
    watchPayOrder(),
    watchListOrderMine(),
    watchDetailUser(),
    watchUpdateUserProfile()
  ]);
}
