// server.js
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();
const dbConfig = require("./config/db");
app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);











app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
