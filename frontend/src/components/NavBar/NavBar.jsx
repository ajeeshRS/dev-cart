import "./NavBar.css";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle, Favorite, FavoriteBorder, FavoriteOutlined, Home, HomeMaxOutlined, HomeOutlined, Logout, Person, SearchOutlined, ShoppingCart } from "@mui/icons-material";
import DrawerComponent from "./DrawerComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getHeaders } from "../../utils/auth";
function NavBar() {
  const navigate = useNavigate()
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery,setSearchQuery]= useState('')
  const location = useLocation()
  const [cartItems,setCartItems]= useState([])
  const handleOnChange =(e)=>{
      setSearchQuery(e.target.value);
  }

  const searchButton=async()=>{
    // const res = await axios.get("http://localhost:3001/user/search")

    setSearchQuery('')
  }



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/user/login")
  };

  const getCartItems =async()=>{
    try {
      const res = await axios.get("http://localhost:3001/user/cart",{
        headers:getHeaders()
      })
      setCartItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
getCartItems()
},[cartItems])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="app-bar"
      sx={{
        height: "10svh",
        backgroundColor: "#fff",
        
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
          <IconButton  onClick={searchButton} sx={{color:'#7E30E1'}} size="medium">
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
            
              <Link to={"/user/wishlist"}>
              <IconButton sx={{color:'black'}}>
                <Favorite/>
              </IconButton>
              </Link>
              <Link to={"/user/cart"}>
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCart sx={{color:"black"}} />
              </Badge>
              
              </Link>
              <IconButton sx={{ color: "#262626" }} onClick={handleClick}>
                <Person/>
              </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                  <ListItemIcon>
                  <Person/>
                  </ListItemIcon>
                  Profile
                  </MenuItem>
    
                  <MenuItem onClick={()=>handleLogOut()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
            </>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default NavBar;
