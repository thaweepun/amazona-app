import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import {
  userSigninReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userTopSellerListReducer,
  userAddressMapReducer,
} from "./reducers/UserReducers";
import rootSaga from "./saga";
import { orderCreateReducer, orderDetailReducer, orderMineListReducer, orderPayReducer } from "./reducers/OrderReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderMineList : orderMineListReducer,
  userDetails : userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate : userUpdateReducer,
  userList : userListReducer,
  userDelete : userDeleteReducer,
  userTopSellerList : userTopSellerListReducer,
  userAddressMap : userAddressMapReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

export default store;
