import "./FoodCard.scss";
import { useNavigate } from "react-router-dom";
const FoodCard = ({ food, isActive, onSelect }) => {
    const navigate = useNavigate();
  if (!food) return null;
  return (
    <div
      className={`zomato-card ${isActive ? "active" : ""}`}
      onClick={() => navigate(`/food/${food._id}`)} 
    >
      <div className="image-wrapper">
        <img src={food.image} alt={food.name} loading="lazy" />
      </div>

      <div className="card-content">
        <h3>{food.name}</h3>

        <div className="card-footer">
          <span className="price">₹{food.price}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
