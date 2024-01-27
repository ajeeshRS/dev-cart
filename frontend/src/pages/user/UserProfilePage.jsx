import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios"
import {getHeaders} from "../../utils/auth"
function UserProfilePage() {
  const navigate = useNavigate();

  const handleLogOut=()=>{
    localStorage.clear()
    navigate("/user/login")
  }

  const [userDetails,setUserDetails]= useState(null)
  
  const fetchUserInfo = async()=>{
    try {
      const response = await axios.get("http://localhost:3001/user/get",{
        headers:getHeaders()
      })
      if(response){
        setUserDetails(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUserInfo()
  },[userDetails])
  return (
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
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
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
                >
                  Profile
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>

      { userDetails ?

      <Grid container className="main-grid" display={"flex"} mb={5}>
        <Grid
          item
          container
          md={6}
          display={"flex"}
          flexDirection={"column"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Avatar sx={{ width: 100, height: 100 }}>{userDetails.username.charAt(0)}</Avatar>
          </Grid>
          <Grid item pt={3} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography
              sx={{ fontFamily: "poppins", fontWeight: 600, fontSize: "20px" }}
            >
             {userDetails.username}
            </Typography>
            <Typography
              sx={{ fontFamily: "poppins", fontWeight: 600, fontSize: "20px" }}
            >
              {userDetails.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          md={6}
          display={"flex"}
          flexDirection={"column"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
          pl={4}
          pr={4}
        >
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={1}
            mt={2}
            sx={{ cursor: "pointer" }}
            bgcolor={"#fff"}
            borderRadius={"3px"}
          >
            <Grid item>
              <Icon>
                <EditIcon sx={{ color: "#7E30E1" }} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Edit profile
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={1}
            mt={1}
            sx={{ cursor: "pointer" }}
            bgcolor={"#fff"}
            borderRadius={"3px"}
            onClick={() => navigate("/user/cart")}
          >
            <Grid item>
              <Icon>
                <ShoppingCartIcon sx={{ color: "#7E30E1" }} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Cart
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={1}
            mt={1}
            sx={{ cursor: "pointer" }}
            bgcolor={"#fff"}
            borderRadius={"3px"}
            onClick={()=>navigate("/user/profile/orders")}
          >
            <Grid item>
              <Icon>
                <BookmarkIcon sx={{ color: "#7E30E1" }} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Orders
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={1}
            mt={1}
            sx={{ cursor: "pointer" }}
            bgcolor={"#fff"}
            borderRadius={"3px"}
            onClick={() => navigate("/user/address/saved-addresses")}
          >
            <Grid item>
              <Icon>
                <LocationOnIcon sx={{ color: "#7E30E1" }} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Saved addresses
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            alignItems="center"
            spacing={1}
            mt={1}
            sx={{ cursor: "pointer" }}
            bgcolor={"#fff"}
            borderRadius={"3px"}
            onClick={() => navigate("/user/wishlist")}
          >
            <Grid item>
              <Icon>
                <FavoriteIcon sx={{ color: "#7E30E1" }} />
              </Icon>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Wishlist
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={2}
        >
          <button className="custom-btn" onClick={handleLogOut}>Log out</button>
        </Grid>
      </Grid> : <Grid md={6}
          display={"flex"}
          flexDirection={"column"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}>
        <Typography sx={{fontFamily:"montserrat"}}>please login !</Typography>
      </Grid>
      }
    </>
  );
}

export default UserProfilePage;
