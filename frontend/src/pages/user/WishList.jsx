import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import "../../styles/ViewProduct.css";

function WishList() {
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/wishlist", {
        headers: getHeaders(),
      });

      console.log(response.data);
      setWishList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const removeFromWishList = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/wishlist/delete/${itemId}`,
        {
          headers: getHeaders(),
        }
      );

      setWishList((prevWishList) =>
        prevWishList.filter((item) => item._id !== itemId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            elevation={1}
            position="static"
            sx={{
              position: "fixed",
              top: "0px",
              zIndex: "1",
              bgcolor: "#7E30E1",
            }}
          >
            <Toolbar variant="dense">
              <IconButton
                onClick={() => navigate(-1)}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                Wishlist
              </Typography>
              <Grid position={"absolute"} right={30}>
                <IconButton sx={{ color: "white" }}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {wishList.length === 0 ? (
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
            Your wishlist is currently empty. Add some products you love!
          </Typography>
        </Grid>
      ) : (
        wishList.map((product) => (
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
                <Typography fontFamily={"montserrat"} fontWeight={600}>
                  ₹{product.price}
                </Typography>
              </Grid>
            </Link>
            <Grid
              md={4}
              display={"flex"}
              height={"150px"}
              alignItems={"center"}
            >
              <button
                className="custom-btn"
                onClick={() => removeFromWishList(product._id)}
              >
                Remove
              </button>
            </Grid>
          </Grid>
        ))
      )}
    </>
  );
}

export default WishList;
