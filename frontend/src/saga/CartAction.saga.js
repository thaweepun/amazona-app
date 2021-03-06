import {
  call,
  put,
  //delay
} from "redux-saga/effects";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT,
} from "../constants/CartConstants";
import store from "../store";
import axios from "axios";

const apiAddToCart = async (productId) => {
  return await axios.get(`/api/products/${productId}`);
};

export function* addToCart({ payload }) {
  const { id, qty } = payload;
  const { data } = yield call(apiAddToCart, id);
  yield put({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
}

export function* removeFromCart({ payload }) {
  // yield delay(1000);
  yield put({ type: CART_REMOVE_ITEM, payload: payload.id });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
}

export function* saveShippingAddress({ payload }) {
  yield put({ type: CART_SAVE_SHIPPING_ADDRESS, payload: payload });
  localStorage.setItem("shippingAddress", JSON.stringify(payload));
}

export function* savePayment({ payload }) {
  yield put({ type: CART_SAVE_PAYMENT, payload: payload });
}
