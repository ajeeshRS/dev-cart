const express = require("express");
const {
  registerUser,
  loginUser,
  protectedRoute,
  getAllProducts,
} = require("../controllers/userControlleer");
const validateToken = require("../middlewares/validateTokenhandler");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/protected-route", validateToken, protectedRoute);
router.get("/get-products",getAllProducts)

module.exports = router;
