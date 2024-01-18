import {
  AppBar,
  Box,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function ViewAddresses() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user/view-addresses", {
        headers: getHeaders(),
      });
      setAddresses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/user/address/update-address/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/user/delete-address/${id}`,
        {
          headers: getHeaders(),
        }
      );
      if (res) {
        setAddresses((prevAddress) =>
          prevAddress.filter((item) => item.id !== id)
        );
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [addresses]);
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
              <Typography
                fontFamily={"poppins"}
                variant="h6"
                color="inherit"
                component="div"
              >
                Addresses
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid md={12} mt={7}>
        <Grid
          md={12}
          pt={3}
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <button
            onClick={() => navigate("/user/address/add-address")}
            style={{
              height: "30px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#7E30E1",
              border: "none",
              cursor: "pointer",
              marginRight: "45px",
              borderRadius: "3px",
            }}
          >
            <Add sx={{ color: "#fff" }} />
            <Typography sx={{ color: "#fff", fontFamily: "montserrat" }}>
              {" "}
              Add new address
            </Typography>
          </button>
        </Grid>
        <Grid md={12}>
          <Typography
            pl={10}
            mt={2}
            sx={{
              fontSize: "12px",
              fontFamily: "poppins",
              color: "grey",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnIcon />
            Saved addresses
          </Typography>
        </Grid>
        {addresses.map((item) => (
          <>
            <Grid
              md={12}
              mt={5}
              pl={11}
              pr={5}
              mb={5}
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid display={"flex"} flexDirection={"column"}>
                <Typography sx={{ fontFamily: "poppins" }}>
                  {item.fullName}
                </Typography>
                <Typography sx={{ fontFamily: "poppins" }}>
                  {item.phoneNo}
                </Typography>
                <Typography sx={{ fontFamily: "poppins" }}>
                  {item.street}
                </Typography>
                <Typography sx={{ fontFamily: "poppins" }}>
                  {item.city}
                </Typography>
                <Typography sx={{ fontFamily: "poppins" }}>
                  {item.pinCode}
                </Typography>
              </Grid>
              <Grid>
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => {
                    handleEdit(item._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider light />
          </>
        ))}
        <Grid></Grid>
      </Grid>
    </>
  );
}

export default ViewAddresses;
