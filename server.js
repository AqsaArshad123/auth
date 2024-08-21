const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");
const { errorHandler } = require("./middleware/errorHandler.js");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
