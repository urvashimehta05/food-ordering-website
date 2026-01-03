import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;

const FoodDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/foods/${id}`)
      .then(res => setFood(res.data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ food, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  if (!food) return <p>Loading...</p>;

  return (
    <FoodDetails
      food={food}
      onAddToCart={addToCart}
    />
  );
};

export default FoodDetailsPage;
