import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASE_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <p>You have not placed any orders yet</p>
      )}

      {/* Orders list */}
      {!loading &&
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span>Order ID: #{order._id.slice(-6)}</span>
              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  loading="lazy"
                />
                <div>
                  <p>{item.food.name}</p>
                  <span>
                    ₹{item.food.price} × {item.quantity}
                  </span>
                </div>
              </div>
            ))}

            <div className="order-total">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
