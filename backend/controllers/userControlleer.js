const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const product = require("../models/productModel");
const wishList = require("../models/userWishlistModel");
// register user
const registerUser = asyncHandler(async (req, res) => {
  const { userFormData } = req.body;
  const { email, username, password } = userFormData;

  if (!email || !username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await user.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  await user
    .create({
      email,
      username,
      password: hashedPassword,
    })
    .then((response) => {
      // console.log(response);
      res.send("Account created succesfully !");
    })
    .catch((err) => console.log(err));
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { loginData } = req.body;
  const { email, password } = loginData;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExist = await user.findOne({ email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userExist.username,
          email: userExist.email,
          id: userExist._id,
        },
      },
      process.env.ACCESS_KEY,
      { expiresIn: "7d" }
    );
    console.log({ accessToken });
    res.status(200).json({ accessToken });
  }
  // if(userExist){
  //   console.log(userExist);
  // }
  else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const data = await product.find();
    res.json(data);
  } catch (error) {
    console.log("could not fetch details");
    res.status(404).json("could not fetch details");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await product.findById(id);
    res.json({ data: data, message: "product fetched successfully" });
  } catch (err) {
    console.log(err);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let wishlist = await wishList.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new wishList({ user: userId, products: [] });
    }

    const index = wishlist.products.indexOf(productId);

    if (index !== -1) {
      wishlist.products.splice(index, 1);
      console.log("product removed success");
      res.json("product removed success");
    } else {
      wishlist.products.push(productId);
      console.log("product added successfully");

      res.json("product added successfully");
    }

    await wishlist.save();
  } catch (err) {
    console.log(err);
  }
});

const deleteFromWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let wishlist = await wishList.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new wishList({ user: userId, products: [] });
    }

    const index = wishlist.products.indexOf(productId);

    if (index !== -1) {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      console.log("Product removed successfully");
      res.json("Product removed successfully");
    } else {
      console.log("Product not found in wishlist");
      res.status(404).json("Product not found in wishlist");
    }
  } catch (error) {
    console.log(error);
  }
});

const getAllFavorites = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    let wishlist = await wishList.findOne({ user: userId });
    if (wishlist) {
      let favorites = wishlist.products;
      res.json({ fav: favorites });
    }
  } catch (error) {
    console.log(error);
  }
});

const getFavoriteProductDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const wishlist = await wishList.findOne({ user: userId });

  if (!wishlist) {
    res.status(404).json("Wishlist not found");
  }

  const populatedWishlist = await Promise.all(
    wishlist.products.map(async (item) => {
      const productItem = await product.findById(item);
      return productItem;
    })
  );

  if (populatedWishlist) {
    res.status(200).json(populatedWishlist);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getAllProducts,
  getProduct,
  addToWishlist,
  deleteFromWishlist,
  getAllFavorites,
  getFavoriteProductDetails,
};
