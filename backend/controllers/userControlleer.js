const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const product = require("../models/productModel");
const wishList = require("../models/userWishlistModel");
const userCart = require("../models/userCartModel");
const address = require("../models/addressModel");

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { userFormData } = req.body;
  const { email, username, password } = userFormData;

  if (!email || !username || !password) {
    res.status(401);
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
      res.status(200).send("Account created succesfully !");
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
    //console.log({ accessToken });
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
    res.status(200).json(data);
  } catch (error) {
    // console.log("could not fetch details");
    res.status(404).json("could not fetch details");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await product.findById(id);
    res
      .status(200)
      .json({ data: data, message: "product fetched successfully" });
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
      // console.log("product removed success");
      res.status(200).json("product removed success");
    } else {
      wishlist.products.push(productId);
      // console.log("product added successfully");

      res.status(200).json("product added successfully");
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
      // console.log("Product removed successfully");
      res.status(200).json("Product removed successfully");
    } else {
      // console.log("Product not found in wishlist");
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
      res.status(200).json({ fav: favorites });
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

const addToCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let cart = await userCart.findOne({ user: userId });

    if (!cart) {
      cart = new userCart({ user: userId, products: [] });
    }

    const index = cart.products.indexOf(productId);

    if (index !== -1) {
      res.status(401).json("product already exists");
    } else {
      cart.products.push(productId);
      // console.log("product added successfully");
      res.status(200).json("product added to cart successfully");
    }

    await cart.save();
  } catch (err) {
    console.log(err);
  }
});

const getCartProducts = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await userCart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json("no cart for this user");
    }

    const populatedCart = await Promise.all(
      cart.products.map(async (itemId) => {
        let cartItem = await product.findById(itemId);
        return cartItem;
      })
    );

    if (populatedCart) {
      res.status(200).json(populatedCart);
    }
  } catch (error) {
    console.log(error);
  }
});

const deleteFromCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let cart = await userCart.findOne({ user: userId });

    if (!cart) {
      cart = new wishList({ user: userId, products: [] });
    }

    const index = cart.products.indexOf(productId);

    if (index !== -1) {
      cart.products.splice(index, 1);
      await cart.save();
      const data = await product.findByIdAndUpdate(
        { _id: productId },
        { quantity: 1 },
        { new: true }
      );
      res.status(200).json("Product removed successfully");
    } else {
      res.status(404).json("Product not found in cart");
    }
  } catch (error) {
    console.log(error);
  }
});

const updateQuantity = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;

    const updatedProduct = await product.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: { quantity },
      },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.log(error);
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  try {
    const term = req.params.term;
    const products = await product.find({ $text: { $search: term } });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

const addAddress = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    const { fullName, phone, street, city, state, pincode } = data;
    const result = await address.create({
      user: req.user.id,
      fullName: fullName,
      phoneNo: phone,
      street: street,
      city: city,
      state: state,
      pinCode: pincode,
    });
    if (result) {
      res.status(201).json("Address saved succesfully");
    }
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

const viewAddresses = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await address.find({ user: userId });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const id = req.params.id;
  const { fullName, phone, street, city, state, pincode } = data;
  const updatedFields = {};

  if (fullName) {
    updatedFields.fullName = fullName;
  }
  if (phone) {
    updatedFields.phone = phone;
  }
  if (street) {
    updatedFields.street = street;
  }
  if (city) {
    updatedFields.city = city;
  }
  if (state) {
    updatedFields.state = state;
  }
  if (pincode) {
    updatedFields.pinCode = pincode;
  }

  try {
    const result = await address.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!result) {
      res.status(404).json("error finding item or unable to update.");
    }
    res.status(201).json("product updated succesfully!");
  } catch (error) {
    console.log(error);
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await address.deleteOne({ _id: id });
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
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
  addToCart,
  getCartProducts,
  deleteFromCart,
  updateQuantity,
  searchProducts,
  addAddress,
  viewAddresses,
  updateAddress,
  deleteAddress,
};
