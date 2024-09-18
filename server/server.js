const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
