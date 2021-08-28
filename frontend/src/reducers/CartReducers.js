import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";
import { CART_EMPTY } from "../constants/OrderConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (val) => val.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((val) =>
            val.product === existItem.product ? item : val
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (val) => val.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
