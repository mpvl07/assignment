const mongoose = require("mongoose");
require("dotenv").config();

//const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1/Assign";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose;
