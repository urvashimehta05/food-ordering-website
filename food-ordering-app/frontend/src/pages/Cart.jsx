import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardNumber, setCardNumber] = useState("");
const [expiry, setExpiry] = useState("");
const [cvv, setCvv] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity === 1) return;
    updated[index].quantity -= 1;
    updateCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

const placeOrder = async () => {
  if (!token) {
    toast.error("Please login to place order");
    navigate("/login");
    return;
  }

  if (!address.trim()) {
    toast.error("Please enter delivery address");
    return;
  }
if (paymentMethod === "CARD") {
  if (cardNumber.length !== 16) {
    toast.error("Invalid card number");
    return;
  }
  if (!expiry) {
    toast.error("Please select expiry date");
    return;
  }
  if (cvv.length !== 3) {
    toast.error("Invalid CVV");
    return;
  }
}

  if (cart.length === 0) {
    toast.error("Cart is empty");
    return;
  }

  const deliveryFee = 40;
  const finalAmount = totalAmount + deliveryFee;

  const items = cart.map((c) => ({
    food: c.food._id,
    quantity: c.quantity,
  }));

  try {
    await axios.post(
      `${BASE_URL}/api/orders`,
      {
        items,
        totalAmount: finalAmount, 
        address,
        paymentMethod,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.removeItem("cart");
    toast.success("Order placed successfully ✅");
    navigate("/orders");
  } catch (error) {
    console.error(error);
    toast.error("Failed to place order");
  }
};


  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty 🛒</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.food.image} alt={item.food.name} />

                <div className="item-info">
                  <h4>{item.food.name}</h4>
                  <p>₹{item.food.price}</p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>
                </div>

                <div className="item-actions">
                  <span>
                    ₹{item.food.price * item.quantity}
                  </span>
                  <button onClick={() => removeItem(index)}>✕</button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total: ₹{totalAmount}
            </div>
          </div>
<div className="checkout-box">
  <div className="checkout-section">
    <h4>Delivery Address</h4>
    <textarea
      placeholder="Enter delivery address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>

  {/* PRICE SUMMARY */}
  <div className="checkout-section summary">
    <h4>Order Summary</h4>

    <div className="summary-row">
      <span>Items total</span>
      <span>₹{totalAmount}</span>
    </div>

    <div className="summary-row">
      <span>Delivery fee</span>
      <span>₹40</span>
    </div>

    <div className="summary-row total">
      <span>Total payable</span>
      <span>₹{totalAmount + 40}</span>
    </div>
  </div>

  {/* PAYMENT */}
  <div className="checkout-section">
    <h4>Payment Method</h4>

    <label>
      <input
        type="radio"
        checked={paymentMethod === "COD"}
        onChange={() => setPaymentMethod("COD")}
      />
      Cash on Delivery
    </label>

    <label>
      <input
        type="radio"
        checked={paymentMethod === "CARD"}
        onChange={() => setPaymentMethod("CARD")}
      />
      Card Payment
    </label>
  </div>
{paymentMethod === "CARD" && (
  <div className="checkout-section card-section">
    <h4>Card Details</h4>

    <input
      type="text"
      placeholder="Card Number"
      maxLength="16"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
    /><br /><br />

    <div className="card-row">
      <input
        type="month"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
<br />
      <input
        type="password"
        placeholder="CVV"
        maxLength="3"
        value={cvv}
        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
      />
    </div>
  </div>
)}
  <button onClick={placeOrder}>
    Place Order
  </button>

</div>

        </div>
      )}
    </div>
  );
};

export default Cart;
