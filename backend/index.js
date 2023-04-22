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

/**
 * @description Route to handle user related operations
 * @route /api/users
 */
app.use("/api/users", require("./routes/user"));

/**
 * @description Route to handle 404 errors
 * @route *
 */
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/`);
});
