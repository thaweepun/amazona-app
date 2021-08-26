import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM_REQUEST,
} from "../constants/CartConstants";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({ type, payload });
  const actionAddItem = (id, qty) => {
    action(CART_ADD_ITEM_REQUEST, { id, qty });
  };

  useEffect(() => {
    if (productId) {
      actionAddItem(productId, qty);
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    action(CART_REMOVE_ITEM_REQUEST, { id });
  };

  const checkoutHandler = (id) => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        actionAddItem(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((sum, val) => sum + val.qty, 0)}{" "}
                items) : $
                {cartItems.reduce((sum, val) => sum + val.price * val.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
