import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import rootSaga from "./saga";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
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
