import { call, put } from "redux-saga/effects";
import { CART_ADD_ITEM } from "../constants/CartConstants";
import store from "../store";
import axios from "axios";

const apiAddToCart = async (productId) => {
  return await axios.get(`/api/products/${productId}`);
};

export function* addToCart({ payload }) {
  const { productId, qty } = payload;
  const { data } = yield call(apiAddToCart, productId);
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
