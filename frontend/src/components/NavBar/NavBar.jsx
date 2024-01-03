import "./NavBar.css";
import {
  AppBar,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import DrawerComponent from "./DrawerComponent";
import { useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function NavBar() {

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery,setSearchQuery]= useState('')
  const location = useLocation()

  const handleOnChange =(e)=>{
      setSearchQuery(e.target.value);
  }

  const searchButton=async()=>{
    // const res = await axios.get("http://localhost:3001/user/search")

    setSearchQuery('')
  }


  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="app-bar"
      sx={{
        height: "10svh",
        backgroundColor: "#FCFDF2",
        boxShadow: "0px 1px 5px 0px rgb(194, 194, 194)",
      }}
    >
      <Grid
        md={12}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"10svh"}
      >
        <Grid
          md={4}
          sx={{
            marginLeft: {
              xs: "10px",
              md: "20px",
              sm: "10px",
            },
          }}
          pl={"auto"}
        >
          <Typography
            sx={{
              color: "#262626",
              fontSize: {
                md: "30px",
                sm: "25px",
                xs: "25px",
              },
              fontWeight: "800",
              fontFamily: "montserrat",
              cursor: "pointer",
            }}
          >
            Dev Cart<span className="span-el" style={{color:'#'}}>.</span>
          </Typography>
        </Grid>
        <Grid md={4}>
          <input onChange={handleOnChange} type="text" value={searchQuery} className="search-input" placeholder="Search product" />
          <IconButton onClick={searchButton} color="black" size="large">
            <SearchOutlined />
          </IconButton>
        </Grid>

        <Grid
          md={4}
          color={"#262626"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={5}
          pr={"auto"}
          sx={{
            marginRight: {
              xs: "10px",
              md: "20px",
              sm: "10px",
            },
          }}
        >
          {isMatch ? (
            <DrawerComponent />
          ) : (
            <>
              <Typography
              className="nav-items"
                sx={{
                  cursor: "pointer",
                  fontFamily: "montserrat",
                  fontWeight: "600",
                }}
              >Home
              </Typography>
              <Typography
              className="nav-items"
                sx={{
                  cursor: "pointer",
                  fontFamily: "montserrat",
                  fontWeight: "600",
                }}
              >
                Products
              </Typography>
              <IconButton sx={{ color: "#262626" }}>
                <AccountCircle sx={{ width: "40px", height: "40px" }} />
              </IconButton>
            </>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default NavBar;
