import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

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
    default:
      return state;
  }
};
