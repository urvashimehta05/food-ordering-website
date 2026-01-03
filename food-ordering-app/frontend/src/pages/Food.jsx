import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard/FoodCard";
import "./Food.scss";
import Banner from "../components/Banner/Banner.jsx";
import FoodCategory from "../components/FoodCategory/FoodCategory.jsx";
const BASE_URL = "http://localhost:5000/api";
import Faq from "../components/FAQ/Faq"
const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  useEffect(() => {
    axios
      .get(`${BASE_URL}/foods`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
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
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No food found 🍽️</p>
          )}
        </div>
      </div>
    </div>
    <Faq />
    </>
  );
};
export default Foods;
