import "./FoodCategory.scss";

const categories = [
  {
    name: "Burger",
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
  },
  {
    name: "Pizza",
    image:
      "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
  },
  {
    name: "Coffee",
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
  },
  {
    name: "Ice Cream",
    image:
      "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg",
  },
  {
    name: "Cheesecake",
    image:
      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
  },
  {
    name: "Momos",
    image:
      "https://images.pexels.com/photos/5713766/pexels-photo-5713766.jpeg",
  },
  {
    name: "Soup",
    image:
      "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
  },
  {
    name: "Noodles",
    image:
      "https://images.pexels.com/photos/1907229/pexels-photo-1907229.jpeg",
  },
];

const FoodCategory = () => {
  return (
    <section className="food-category">
      <div className="overlay-bg">
        <h2>What would you like to have?</h2>
        <p style={{fontWeight:"900"}}>Cheesy pizza or spicy burger?</p>

        <div className="category-list website">
          {categories.map((cat) => (
            <div className="category-item" key={cat.name}>
              <div className="circle">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
<div className="category-list mobile">
  {categories.slice(0, 3).map((cat) => (
    <div className="category-item" key={cat.name}>
      <div className="circle">
        <img src={cat.image} alt={cat.name} />
      </div>
      <span>{cat.name}</span>
    </div>
  ))}
</div>
</div>
    </section>
  );
};

export default FoodCategory;
