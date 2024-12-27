const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register)//Register User
      .post("/login", login);//Login User

module.exports = router;
