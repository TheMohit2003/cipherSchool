/* eslint-env node */
const express = require("express");
const connectDB = require("./config/db");
connectDB();

const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`the port is running on http://localhost:${PORT}/`);
});
