import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import AddIcon from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
function UserCartPage() {
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/cart", {
        headers: getHeaders(),
      });
      setCartProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                component="div"
                sx={{
                  fontFamily: "montserrat",
                  fontWeight: "800",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                Cart
              </Typography>
              <Grid position={"absolute"} right={30}>
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => navigate("/user/wishlist")}
                >
                  <FavoriteIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {loading ? (
        <Grid
          md={12}
          pt={10}
          width={"100%"}
          height={"90svh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography sx={{ color: "grey", fontFamily: "montserrat" }}>
            Loading....
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
      {cartProducts.length > 0 && loading == false ? (
        <Grid
          mt={5}
          pb={10}
          md={12}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          pr={5}
        >
          <Typography
            pb={5}
            fontFamily={"montserrat"}
            fontWeight={600}
          >{`Cart subtotal : ₹${totalAmount.toFixed(2)}`}</Typography>
          <Link to={"/user/cart/checkout/address"}>
            <button className="custom-btn">checkout</button>
          </Link>
        </Grid>
      ) : (
        cartProducts.length === 0 &&
        loading == false && (
          <Grid
            md={12}
            pt={10}
            width={"100%"}
            height={"90svh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography sx={{ color: "grey", fontFamily: "montserrat" }}>
              Your cart is currently empty. Add some products you want to buy!
            </Typography>
          </Grid>
        )
      )}
    </>
  );
}

export default UserCartPage;
