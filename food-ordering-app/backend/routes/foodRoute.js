const express = require("express");
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/authFoodController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public (User)
router.get("/", getFoods);

// Admin
router.post("/", protect, adminOnly, addFood);
router.put("/:id", protect, adminOnly, updateFood);
router.get("/:id", getFoodById); 
router.delete("/:id", protect, adminOnly, deleteFood);

module.exports = router;
