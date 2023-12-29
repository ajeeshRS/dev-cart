const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const product = require("../models/productModel");

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

// sample protected route
const protectedRoute = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "this is a private route" });
});

const getAllProducts = asyncHandler(async(req,res)=>{
    const data= await product.find()

    console.log(data)

    res.json(data)
})

module.exports = {
  registerUser,
  loginUser,
  protectedRoute,
  getAllProducts
};
