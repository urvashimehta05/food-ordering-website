const Food = require("../models/Food");
exports.addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isAvailable: true });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!food)
      return res.status(404).json({ message: "Food not found" });

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food)
      return res.status(404).json({ message: "Food not found" });

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
