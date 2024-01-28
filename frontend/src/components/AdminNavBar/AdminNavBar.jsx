import "./AdminNavBar.css";
import {
  AppBar,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Avatar,
  Divider,
  MenuItem,
  ListItemIcon,
  Menu,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import {
  Logout
} from "@mui/icons-material";
import DrawerComponent from "./DrawerComponent";
import { useState } from "react";

function AdminNavBar({ admin }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
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
    navigate("/admin/login");
  };
  return (
    <AppBar
    elevation={0}
      position="fixed"
      className="app-bar"
      sx={{
        height: "10svh",
        backgroundColor: "#fff",
        // boxShadow: "0px 1px 5px 0px rgb(194, 194, 194)",
      }}
    >
      <Grid
        item
        md={12}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"10svh"}
      >
        <Grid
          item
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
              fontFamily: "Pacifico",
              cursor: "pointer",
            }}
          >
            DevCart <span className="span-el" style={{color:'#7E30E1'}}>.</span>
          </Typography>
        </Grid>

        {admin ? (
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
                  sx={{
                    cursor: "pointer",
                    fontFamily: "montserrat",
                    fontWeight: "600",
                  }}
                >
                  Dashboard
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontFamily: "montserrat",
                    fontWeight: "600",
                  }}
                >
                  <Link to={"/admin/add-coupon"} style={{ textDecoration: "none", color: "#262626" }}>
                  Add coupon
                  </Link>

                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontFamily: "montserrat",
                    fontWeight: "600",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "#262626" }}
                    to={"/admin/all-products"}
                  >
                    All Products
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontFamily: "montserrat",
                    fontWeight: "600",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "#262626" }}
                    to={"/admin/add-product"}
                  >
                    Add Product
                  </Link>
                </Typography>

                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
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
                  <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Grid>
        ) : null}
      </Grid>
    </AppBar>
  );
}

export default AdminNavBar;
