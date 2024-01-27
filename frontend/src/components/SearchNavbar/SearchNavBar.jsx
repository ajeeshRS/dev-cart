import React, { useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchContext } from "../../context/SearchContext";
import { getHeaders } from "../../utils/auth";
function SearchNavBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { updateSearchResults } = useSearchContext();

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // to perform search query
  const searchButton = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/user/search/${searchTerm}`,
        {
          headers: getHeaders(),
        }
      );
      if (res.status === 200) {
        updateSearchResults(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchButton();
    }
  };
  return (
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
            height: "50px",
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
            <Grid pl={10}>
              <input
                style={{ borderRadius: "50px", height: "35px", width: "300px" }}
                className="search-input"
                onKeyDown={handleKeyPress}
                value={searchTerm}
                onChange={handleOnChange}
                type="text"
                placeholder="search products"
              />
              <IconButton
                onClick={searchButton}
                sx={{
                  color: "#fff",
                  backgroundColor: "#7E30E1",
                  marginLeft: "10px",
                  "&:hover": { color: "#fff", backgroundColor: "#6018BE" },
                  transition: "0.3s ease-in",
                }}
                size="small"
              >
                <Search sx={{ color: "#fff" }} />
              </IconButton>
            </Grid>
            <Grid position={"absolute"} right={30}>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => navigate("/user/wishlist")}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => navigate("/user/cart")}
              >
                <ShoppingCartOutlined />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
}

export default SearchNavBar;
