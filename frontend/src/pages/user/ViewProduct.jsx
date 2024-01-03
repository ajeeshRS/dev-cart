import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
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
function ViewProduct() {
  const navigate = useNavigate();

  const hanldeBackButton = () => {
    navigate(-1);
  };
  const [product, setProduct] = useState(null);

  const { id } = useParams();

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
        console.log(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductDetails();
  }, []);
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
                  top: "0px",
                  zIndex: "1",
                  bgcolor: "#fff",
                }}
              >
                <Toolbar variant="dense">
                  <IconButton
                    onClick={() => hanldeBackButton()}
                    edge="start"
                    style={{ color: "#7E30E1" }}
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
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
                <button className="custom-btn">Add to cart</button>
                <button className="custom-btn">Buy now</button>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}

export default ViewProduct;
