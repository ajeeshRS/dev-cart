import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Remove from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { getHeaders } from "../../utils/auth";
import axios from "axios";
import useRazorpay from "react-razorpay";
import {
  notifyCouponAppliedSuccess,
  notifyCouponError,
} from "../../utils/toastify";
import { ToastContainer } from "react-toastify";

function OrderSummaryPage() {
  const [Razorpay] = useRazorpay();
  const location = useLocation();
  const addressId = location.state.id;
  const navigate = useNavigate();
  // states
  const [address, setAddress] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmountToBePaid, setTotalAmountToBePaid] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);
  const [couponValue, setCouponValue] = useState("");

  const { fullName, phoneNo, street, city, state, pinCode } = address;
  const addressString = `${fullName},${phoneNo},${street},${city},${state},${pinCode}`;

  const fetchAddress = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/user/address/${addressId}`,
        {
          headers: getHeaders(),
        }
      );
      setAddress(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCartProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/cart", {
        headers: getHeaders(),
      });
      setCartProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity > 0) {
        const response = await axios.put(
          `http://localhost:3001/user/cart/update/quantity/${itemId}`,
          {
            quantity: quantity,
          },
          {
            headers: getHeaders(),
          }
        );
        if (response.data.success) {
          setCartProducts((prevCart) =>
            prevCart.map((item) =>
              item._id === itemId ? { ...item, quantity: quantity } : item
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/cart/delete/${itemId}`,
        {
          headers: getHeaders(),
        }
      );
      setCartProducts((prevCart) =>
        prevCart.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount = cartProducts.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  const handleChange = (e) => {
    e.preventDefault();
    setCouponValue(e.target.value);
  };

  const handleApplyBtn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/user/check-coupon",
        { couponValue, totalAmount },
        {
          headers: getHeaders(),
        }
      );

      if (res.data.valid === true) {
        const discountPercentage = res.data.discountPercentage;
        const calculatedDiscountAmount = Math.round(
          (discountPercentage / 100) * totalAmount
        );
        const updatedTotalAmountToBePaid =
          totalAmount - calculatedDiscountAmount;
        setDiscountAmount(calculatedDiscountAmount);
        setTotalAmountToBePaid(updatedTotalAmountToBePaid);
        notifyCouponAppliedSuccess();
        setCouponValue(" ");
      }
    } catch (error) {
      console.log(error);
      notifyCouponError(error.response.data.message);
    }
  };

  const initPayment = (data) => {
    const orderDetails = {
      orderId: data.id,
      amount: data.amount,
      productDetails: cartProducts,
      discount: discountAmount ? discountAmount : null,
    };
    const options = {
      key: "rzp_test_c63laqjRhLhKki",
      amount: data.amount,
      currency: data.currency,
      name: "order1",
      image: null,
      description: cartProducts.length,
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "http://localhost:3001/user/checkout/verify-payment",
            { response },
            {
              headers: getHeaders(),
            }
          );

          orderDetails !== null &&
            navigate("/user/cart/checkout/order-confirm", {
              state: {
                details: orderDetails,
                paymentId: response.razorpay_payment_id,
                address: address,
              },
            });
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#7E30E1",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/user/checkout/payment",
        { amount: discountAmount ? totalAmountToBePaid : totalAmount },
        {
          headers: getHeaders(),
        }
      );
      console.log(data.data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch address
  useEffect(() => {
    fetchAddress();
  }, []);

  // fetch cart products
  useEffect(() => {
    fetchCartProducts();
  }, [cartProducts]);

  return (
    <>
      <Grid md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            elevation={0}
            position="static"
            sx={{
              position: "fixed",
              top: "0px",
              zIndex: "1",
              bgcolor: "#fff",
            }}
          >
            <Toolbar variant="dense">
              <IconButton
                onClick={() => navigate(-1)}
                edge="start"
                style={{ color: "#7E30E1" }}
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                color={"black"}
                fontFamily={"montserrat"}
                fontSize={"20px"}
                fontWeight={800}
                component="div"
              >
                Order Summary
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid md={12} mt={12} pb={2} width={"100%"} display={"flex"}>
        <Typography fontFamily={"poppins"} fontWeight={600} pl={8} pr={1}>
          Deliver to :{" "}
        </Typography>
        <Typography fontFamily={"poppins"}>
          {" "}
          {address ? addressString : "no address selected"}
        </Typography>
      </Grid>
      <Grid md={12}>
        {loading ? (
          <Grid
            width={"100%"}
            height={"60svh"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography fontFamily={"poppins"} color={"grey"}>
              Loading...
            </Typography>
          </Grid>
        ) : (
          cartProducts.map((product) => (
            <Grid
              md={12}
              sx={{ cursor: "pointer" }}
              padding={6}
              pt={10}
              border={"1px solid #F8FAE5"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
              position={"relative"}
              p={5}
              key={product._id}
            >
              <Grid md={4} width={"400px"}>
                <img
                  className="product-img"
                  src={`http://localhost:3001/uploads/${product.image.filename}`}
                  alt="product-image"
                />
              </Grid>
              <Link to={`/user/view-product/${product._id}`}>
                <Grid
                  md={4}
                  position={"absolute"}
                  left={300}
                  display={"flex"}
                  height={"150px"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  sx={{ textDecoration: "none" }}
                  color={"black"}
                >
                  <Typography
                    fontFamily={"poppins"}
                    color={"#607274"}
                    fontWeight={500}
                  >
                    {product.title}
                  </Typography>
                  <Typography fontFamily={"poppins"} fontWeight={500}>
                    {product.brand}
                  </Typography>
                  <Typography fontFamily={"poppins"} fontWeight={500}>
                    {product.description}
                  </Typography>
                </Grid>
              </Link>
              <Grid
                md={4}
                display={"flex"}
                height={"150px"}
                alignItems={"center"}
              >
                <Grid
                  mr={10}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  position={"absolute"}
                  right={"250px"}
                >
                  <IconButton
                    onClick={() =>
                      updateQuantity(product._id, product.quantity - 1)
                    }
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{product.quantity}</Typography>
                  <IconButton
                    onClick={() =>
                      updateQuantity(product._id, product.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <button
                  style={{
                    marginRight: "20px",
                    position: "relative",
                    right: "10px",
                  }}
                  className="custom-btn"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
                <Typography fontFamily={"montserrat"} fontWeight={600}>
                  ₹{product.price * product.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
      <Grid
        md={12}
        width={"100%"}
        height={"100px"}
        display={"flex"}
        pr={14}
        justifyContent={"flex-end"}
        alignItems={"center"}
        pt={5}
        mb={5}
      >
        <Typography
          sx={{ paddingRight: "10px", fontFamily: "poppins", color: "grey" }}
        >
          Have a discount coupon ?
        </Typography>
        <input
          style={{
            width: "200px",
            borderRadius: "3px",
            border: "1px solid grey",
            height: "35px",
            marginRight: "10px",
            paddingLeft: "5px",
          }}
          onChange={handleChange}
          value={couponValue}
          placeholder="coupon code"
        />
        <button className="custom-btn" onClick={handleApplyBtn}>
          Apply
        </button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </Grid>
      <Divider />
      <Grid pt={5} pl={15} pr={15} pb={10}>
        <Typography sx={{ fontFamily: "poppins", fontWeight: "600" }}>
          Price details
        </Typography>
        {discountAmount ? (
          <>
            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={3}
            >
              <Typography sx={{ fontFamily: "poppins" }}>
                Price ({cartProducts.length} items)
              </Typography>
              <Typography sx={{ fontFamily: "poppins" }}>
                ₹{totalAmount}
              </Typography>
            </Grid>

            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={1}
            >
              <Typography sx={{ fontFamily: "poppins" }}>Discount</Typography>
              <Typography sx={{ fontFamily: "poppins", color: "green" }}>
                -₹{discountAmount}
              </Typography>
            </Grid>
            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={1}
            >
              <Typography sx={{ fontFamily: "poppins", fontWeight: "600" }}>
                Total amount
              </Typography>
              <Typography sx={{ fontFamily: "poppins", fontWeight: "600" }}>
                ₹{totalAmountToBePaid}
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={3}
            >
              <Typography sx={{ fontFamily: "poppins" }}>
                Price ({cartProducts.length} items)
              </Typography>
              <Typography sx={{ fontFamily: "poppins" }}>
                ₹{totalAmount}
              </Typography>
            </Grid>
            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={1}
            >
              <Typography sx={{ fontFamily: "poppins", fontWeight: "600" }}>
                Total Amount
              </Typography>
              <Typography sx={{ fontFamily: "poppins", fontWeight: "600" }}>
                ₹{totalAmount}
              </Typography>
            </Grid>
          </>
        )}
        <Grid
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          pt={3}
        >
          <button className="custom-btn" onClick={handlePayment}>
            Proceed
          </button>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderSummaryPage;
