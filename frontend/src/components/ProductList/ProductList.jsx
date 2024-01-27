import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductList.css";
import { getHeaders } from "../../utils/auth";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //   extracting category name from url
  const { category } = useParams();

  //  making the first letter caps and remove the last letter (s) to filter products with category name
  const removedTrailLetter = category.replace(/s$/, "");
  const categoryName =
    removedTrailLetter.charAt(0).toUpperCase() + removedTrailLetter.slice(1);

  // fetching product details
  useEffect(() => {
    const fetchKeyboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/user/get-products",
          {
            headers: getHeaders(),
          }
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchKeyboards();
  }, []);

  const [loading, setLoading] = useState(true);
  // filtering keyboard details from products array
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) => product.category === categoryName
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }
  }, [products]);

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/user/wishlist/all-products",
        {
          headers: getHeaders(),
        }
      );

      setFavorites(response.data.fav);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (itemId) => {
    if (favorites.includes(itemId)) {
      // Item is already in favorites, remove it
      setFavorites(favorites.filter((id) => id !== itemId));
      try {
        const response = await axios.delete(
          `http://localhost:3001/user/wishlist/delete/${itemId}`,
          {
            headers: getHeaders(),
          }
        );

        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      // Item is not in favorites, add it
      setFavorites([...favorites, itemId]);

      try {
        const response = await axios.post(
          `http://localhost:3001/user/wishlist/${itemId}`,
          {},
          {
            headers: getHeaders(),
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="main-container">
      {loading === false ? (
        filteredProducts.map((product) => (
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
            bgcolor={"#fff"}
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
            <Grid md={4}>
              <IconButton
                onClick={() => {
                  toggleFavorite(product._id);
                }}
                
              >
                {favorites.includes(product._id) ? (
                  <FavoriteIcon sx={{ color: "#C3ACD0" }} />
                ) : (
                  <FavoriteBorder sx={{color:"black"}}/>
                )}
              </IconButton>
            </Grid>
          </Grid>
        ))
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
    </div>
  );
}

export default ProductList;
