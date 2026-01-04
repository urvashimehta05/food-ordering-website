import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/foodCard/FoodCard";
import "./Food.scss";
import Banner from "../components/banner/Banner.jsx";
import FoodCategory from "../components/FoodCategory/FoodCategory.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
import Faq from "../components/FAQ/Faq"
const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
  const searchQuery = searchParams.get("search") || "";
   useEffect(() => {
  const fetchFoods = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/api/foods`);
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchFoods();
}, []);

  const filteredFoods = searchQuery
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : foods;

  return (
    <>
       <Banner />
       <FoodCategory />
    <div style={{ padding: "20px" }} className="foods-page">
   
      <h2 style={{ textAlign: "center" }}>Food Menu</h2>

      <div className="foods-page">
      <div className="foods-grid">
  {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

  {!loading && filteredFoods.length === 0 && (
    <p style={{ textAlign: "center" }}>No food found 🍽️</p>
  )}

  {!loading &&
    filteredFoods.map((food) => (
      <FoodCard key={food._id} food={food} />
    ))}
</div>

      </div>
    </div>
    <Faq />
    </>
  );
};
export default Foods;
