const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors("*"));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/foods", require("./routes/foodRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
