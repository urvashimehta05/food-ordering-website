import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "other",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    axios.get(`${BASE_URL}/foods`).then(res => setFoods(res.data));
  }, []);

  // ➕ ADD FOOD
  const addFood = async (e) => {
     console.log(token);
    e.preventDefault();
    const res = await axios.post(
      `${BASE_URL}/foods`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFoods([...foods, res.data]);
    setForm({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "other",
    });
  };

  // ❌ DELETE FOOD
  const deleteFood = async (id) => {
    await axios.delete(`${BASE_URL}/foods/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFoods(foods.filter(f => f._id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* ➕ ADD FOOD FORM */}
      <form onSubmit={addFood}>
        <h3>Add New Food</h3>

        <input
          placeholder="Food Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          required
        />

        {/* 👀 IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: "120px", height: "80px", objectFit: "cover" }}
          />
        )}

        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="pizza">Pizza</option>
          <option value="burger">Burger</option>
          <option value="drinks">Drinks</option>
          <option value="dessert">Dessert</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Add Food</button>
      </form>

      <hr />

      {/* 📋 FOOD LIST WITH IMAGES */}
      <h3>Food Listings</h3>

      {foods.map(f => (
        <div
          key={f._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={f.image}
            alt={f.name}
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />

          <div>
            <b>{f.name}</b>
            <p>₹{f.price}</p>
          </div>

          <button onClick={() => deleteFood(f._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
