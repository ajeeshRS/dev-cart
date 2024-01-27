import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Badge,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import "../../styles/ViewProduct.css";
import ReactImageMagnify from "react-image-magnify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getHeaders } from "../../utils/auth";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import { ToastContainer } from "react-toastify";
import { notify, notifyAddToWishlist, notifyErr } from "../../utils/toastify";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
function ViewProduct() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  const [product, setProduct] = useState(null);
  const [cartItemCount, setCartItemCount] = useState([]);
  const { id } = useParams();

  const fetchCartItemCount = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user/cart", {
        headers: getHeaders(),
      });
      setCartItemCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartItemCount();
  }, [cartItemCount]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/get-product/${id}`,
          {
            headers: getHeaders(),
          }
        );

        setProduct(response.data.data);
        // console.log(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductDetails();
  }, []);

  const handleAddToCartButton = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/cart/${productId}`,
        {},
        {
          headers: getHeaders(),
        }
      );
      if (response.status == 200) {
        notify();
      }
    } catch (error) {
      console.log(error);
      notifyErr();
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/wishlist/${productId}`,
        {},
        {
          headers: getHeaders(),
        }
      );
      notifyAddToWishlist();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {product ? (
        <>
          <Grid md={12}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                elevation={0}
                position="static"
                sx={{
                  position: "fixed",
                  width: "100%",
                  top: "0px",
                  zIndex: "1",
                  bgcolor: "#fff",
                }}
              >
                <Toolbar
                  variant="dense"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    onClick={() => handleBackButton()}
                    edge="start"
                    style={{ color: "#7E30E1" }}
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Grid md={12}>
                    <Link to={"/user/wishlist"}>
                      <IconButton sx={{ color: "black", marginRight: "10px" }}>
                        <FavoriteBorder />
                      </IconButton>
                    </Link>
                    <Link to={"/user/cart"}>
                      <Badge
                        badgeContent={cartItemCount.length}
                        color="primary"
                      >
                        <ShoppingCartOutlined sx={{ color: "black" }} />
                      </Badge>
                    </Link>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Box>
          </Grid>
          <Grid
            md={12}
            width={"100%"}
            height={"90svh"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              md={6}
              width={"50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid className="product-image">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "product-image",
                      isFluidWidth: true,
                      src: `http://localhost:3001/uploads/${product.image.filename}`,
                    },
                    largeImage: {
                      src: `http://localhost:3001/uploads/${product.image.filename}`,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImagePosition: "over",
                    isHintEnabled: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              md={6}
              width={"50%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"space-between"}
              justifyContent={"center"}
            >
              <Typography
                sx={{
                  fontFamily: "montserrat",
                  fontWeight: 800,
                  paddingBottom: "20px",
                  fontSize: "30px",
                }}
              >
                {product.title}
              </Typography>

              <label
                style={{
                  color: "grey",
                }}
              >
                Brand
              </label>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 400,
                  paddingBottom: "20px",
                }}
              >
                {product.brand}
              </Typography>
              <label
                style={{
                  color: "grey",
                }}
              >
                Product Description
              </label>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 400,
                  paddingBottom: "20px",
                }}
              >
                {product.description}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 600,
                  paddingBottom: "20px",
                }}
              >
                ₹{product.price}
              </Typography>

              <Grid
                md={12}
                pt={5}
                width={"50%"}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <button
                  className="custom-btn"
                  onClick={() => handleAddToCartButton(product._id)}
                >
                  Add to cart
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
                <button
                  className="custom-btn"
                  onClick={() => handleAddToWishlist(product._id)}
                >
                  Add to wishlist
                </button>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
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
            Loading...
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default ViewProduct;
