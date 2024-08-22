const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const { errorHandler } = require("./middleware/errorHandler.js");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
