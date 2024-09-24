const express = require("express");
const userRoute = express.Router();
const { signUp } = require("../controller/userController");
const { login,updateUser} = require("../controller/userController");


const { upload } = require("../multer/multer");  // Import multer setup

// Use multer's upload middleware before your signup handler
userRoute.post("/create", upload, signUp);
userRoute.post("/login",  login);
userRoute.put("/update",upload,updateUser)

module.exports = userRoute; 