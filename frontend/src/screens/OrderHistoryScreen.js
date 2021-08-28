import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_MINE_LIST_REQUEST } from "../constants/OrderConstants";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, orders, error } = orderMineList;

  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({ type, payload });

  useEffect(() => {
    action(ORDER_MINE_LIST_REQUEST);
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((val) => (
              <tr key={val._id}>
                <td>{val._id}</td>
                <td>{val.createdAt.substring(0, 10)}</td>
                <td>{val.totalPrice}</td>
                <td>{val.isPaid ? val.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {val.isDelivered ? val.deliveredAt.substring(0, 10) : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${val._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
