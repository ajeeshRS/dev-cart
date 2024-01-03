const express = require("express");
const {
  registerUser,
  loginUser,
  getAllProducts,
  getProduct,
  addToWishlist,
  deleteFromWishlist,
  getAllFavorites,
  getFavoriteProductDetails,
} = require("../controllers/userControlleer");
const validateToken = require("../middlewares/validateTokenhandler");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/get-products", validateToken, getAllProducts);
router.get("/get-product/:id", validateToken, getProduct);
router.post("/wishlist/:productId", validateToken, addToWishlist);
router.delete("/wishlist/delete/:productId", validateToken, deleteFromWishlist);
router.get("/wishlist/all-products", validateToken, getAllFavorites);
router.get("/wishlist", validateToken, getFavoriteProductDetails);

module.exports = router;
