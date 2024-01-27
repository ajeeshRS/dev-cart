import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Hidden,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./Home.css";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import image1 from "../../assets/linus-mimietz-01hQvBUC7rI-unsplash.jpg";
import image2 from "../../assets/martin-garrido-cVUPic1cbd4-unsplash.jpg";
import image3 from "../../assets/rebekah-yip-wMT0oiL5XjA-unsplash.jpg";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { notify, notifyErr } from "../../utils/toastify";
import "aos/dist/aos.css";
import AOS from "aos";

function Home() {
  const navigate = useNavigate();

  const slides = [
    {
      url: image1,
      text: "Immerse yourself in stunning visuals.",
      buttonText: "Learn more",
      category: "monitors",
    },
    {
      url: image2,
      text: "Precision at your fingertip.",
      buttonText: "Learn more",
      category: "keyboards",
    },
    {
      url: image3,
      text: "Point and click in style.",
      buttonText: "Learn more",
      category: "mouses",
    },
  ];

  const [productData, setProductData] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/user/get-products",
        {
          headers: getHeaders(),
        }
      );
      setProductData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  const keyBoards = productData.filter((obj) => obj.category === "Keyboard");
  const slicedKeyboards = keyBoards.slice(0, 4);
  const mouses = productData.filter((obj) => obj.category === "Mouse");
  const slicedMouses = mouses.slice(0, 4);
  const monitors = productData.filter((obj) => obj.category === "Monitor");
  const slicedMonitors = monitors.slice(0, 4);

  const [favorites, setFavorites] = useState([]);

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

  const viewMoreButtonKeyBoards = () => {
    navigate("/user/keyboards");
  };
  const viewMoreButtonMouses = () => {
    navigate("/user/mouses");
  };
  const viewMoreButtonMonitors = () => {
    navigate("/user/monitors");
  };

  const handleAddToCartButton = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/cart/${productId}`,
        {},
        {
          headers: getHeaders(),
        }
      );
      // console.log(response.data)
      if (response.status === 200) {
        notify();
      }
    } catch (error) {
      console.log(error);
      notifyErr();
    }
  };

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <>
      <Grid md={12} pt={8} pb={9}>
        <Grid md={12}>
          <Grid className="banner">
            <Carousel>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${slide.url})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div className="banner-content">
                    <h2>{slide.text}</h2>
                    <button
                      onClick={() => navigate(`/user/${slide.category}`)}
                      className="banner-button"
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid
            md={12}
            pl={5}
            pt={4}
            pr={5}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontFamily: "montserrat",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              Keyboards
            </Typography>
            <Button
              onClick={viewMoreButtonKeyBoards}
              style={{ color: "#27005D" }}
            >
              View more
            </Button>
          </Grid>
          <Grid
            md={12}
            pl={5}
            pr={5}
            pt={4}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {slicedKeyboards.map((product, index) => (
              <Card
                key={index}
                sx={{
                  width: 270,
                  borderRadius: 3,
                  border: "1px solid #F3F8FF",
                  height: 260,
                  boxShadow: "1px 10px 15px -3px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/uploads/${product.image.filename}`}
                  alt="Paella dish"
                  sx={{ height: "100px",objectFit:"cover" }}
                />
                <Link to={`/user/view-product/${product._id}`}>
                  <CardContent>
                    <Typography
                      fontFamily={"poppins"}
                      variant="h7"
                      sx={{ color: "#607274" }}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      sx={{ position: "absolute", bottom: "50px" }}
                      className="typo"
                      fontWeight={600}
                      pt={2}
                      pb={1}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions
                  disableSpacing
                  sx={{ position: "absolute", bottom: "2px" }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      toggleFavorite(product._id);
                    }}
                  >
                    {favorites.includes(product._id) ? (
                      <FavoriteIcon sx={{ color: "#C3ACD0" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "black" }} />
                    )}
                  </IconButton>

                  <button
                    className="add-to-cart-btn"
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
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid
            md={12}
            pl={5}
            pt={4}
            pr={5}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontFamily: "montserrat",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              Mouse
            </Typography>
            <Button onClick={viewMoreButtonMouses} style={{ color: "#27005D" }}>
              View more
            </Button>
          </Grid>
          <Grid
            md={12}
            pl={5}
            pr={5}
            pt={4}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {slicedMouses.map((product, index) => (
              <Card
                data-aos="zoom-in"
                key={index}
                sx={{
                  width: 270,
                  borderRadius: 3,
                  height: 260,
                  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/uploads/${product.image.filename}`}
                  alt="Paella dish"
                  sx={{ height: "100px",objectFit:"contain" }}
                />
                <Link to={`/user/view-product/${product._id}`}>
                  <CardContent>
                    <Typography
                      fontFamily={"poppins"}
                      variant="h7"
                      sx={{ color: "#607274" }}
                    >
                      {product.title}
                    </Typography>
                    
                    <Typography
                      sx={{ position: "absolute", bottom: "50px" }}
                      className="typo"
                      fontWeight={600}
                      pt={2}
                      pb={1}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions
                  sx={{ position: "absolute", bottom: "2px" }}
                  disableSpacing
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      toggleFavorite(product._id);
                    }}
                  >
                    {favorites.includes(product._id) ? (
                      <FavoriteIcon sx={{ color: "#C3ACD0" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "black" }} />
                    )}
                  </IconButton>
                  <button
                    onClick={() => {
                      handleAddToCartButton(product._id);
                    }}
                    className="add-to-cart-btn"
                  >
                    Add to cart
                  </button>
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid
            md={12}
            pl={5}
            pt={4}
            pr={5}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontFamily: "montserrat",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              Monitors
            </Typography>
            <Button
              onClick={viewMoreButtonMonitors}
              style={{ color: "#27005D" }}
            >
              View more
            </Button>
          </Grid>
          <Grid
            md={12}
            pl={5}
            pr={5}
            pt={4}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {slicedMonitors.map((product, index) => (
              <Card
                data-aos="zoom-in"
                key={index}
                sx={{
                  width: 270,
                  borderRadius: 3,
                  height: 260,
                  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/uploads/${product.image.filename}`}
                  alt="Paella dish"
                  sx={{ height: "100px",objectFit:"contain" }}
                />
                <Link to={`/user/view-product/${product._id}`}>
                  <CardContent>
                    <Typography
                      fontFamily={"poppins"}
                      variant="h7"
                      sx={{ color: "#607274" }}
                    >
                      {product.title}
                    </Typography>
                    
                    <Typography
                      sx={{ position: "absolute", bottom: "50px" }}
                      className="typo"
                      fontWeight={600}
                      pt={2}
                      pb={1}
                    >
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions
                  sx={{ position: "absolute", bottom: "2px" }}
                  disableSpacing
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      toggleFavorite(product._id);
                    }}
                  >
                    {favorites.includes(product._id) ? (
                      <FavoriteIcon sx={{ color: "#C3ACD0" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "black" }} />
                    )}
                  </IconButton>
                  <button
                    onClick={() => {
                      handleAddToCartButton(product._id);
                    }}
                    className="add-to-cart-btn"
                  >
                    Add to cart
                  </button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
