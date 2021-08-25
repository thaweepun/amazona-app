import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CART_ADD_ITEM_REQUEST } from "../constants/CartConstants";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({ type, payload });

  useEffect(() => {
    if (productId) {
      action(CART_ADD_ITEM_REQUEST, {productId, qty});
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
