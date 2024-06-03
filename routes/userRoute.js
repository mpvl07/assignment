const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const authMiddleware = require("../middlewares/authMiddleware");
const User=require('../models/UserModel')
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "melodyverse-frontend/public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  
});
const upload = multer({ storage });

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).send("Access denied.");

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

router.post("/", function (req, res) {
  console.log("Hello");
});

router.post("/signup",upload.single("file"), async (req, res) => {
  const { username, email, password, name} = req.body;

  const file = req.file;
  console.log(file)
  if (!username || !email || !password ) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name,
      file:file,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(201).send({ message: "User registered successfully", token });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      // Handle duplicate username error
      res.status(400).send({ error: "Username is already taken" });
    } else if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Handle duplicate email error if necessary
      res.status(400).send({ error: "Email is already registered" });
    } else {
      console.error("Error during user registration:", err);
      res.status(500).send({ error: "Registration failed", details: err });
    }
  }
});



router.get("/posts", authenticateJWT, async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

module.exports=router;