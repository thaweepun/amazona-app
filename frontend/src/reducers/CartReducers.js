import { CART_ADD_ITEM } from "../constants/CartConstants";

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
    default:
      return state;
  }
};
