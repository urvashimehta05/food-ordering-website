import "./FoodDetails.scss";

const FoodDetails = ({ food, onAddToCart }) => {
  if (!food) return null;

  return (
    <div className="food-detail">
      <img src={food.image} alt={food.name} />

      <div className="content">
        <h1>{food.name}</h1>
        <p>{food.description}</p>

        <div className="pricing">
          <span className="price">₹{food.price}</span>
          <button onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
