import React from "react";
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import { ToastContainer } from "react-toastify";
import { notifyAddressAdded } from "../../utils/toastify";
function AddAddressPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const style = {
    width: "300px",
    height: "25px",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    marginTop: "5px",
    paddingLeft: "5px",
  };

  const labelStyle = {
    color: "grey",
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/add-address",
        { data },
        {
          headers: getHeaders(),
        }
      );
      reset();
      notifyAddressAdded();
    } catch (error) {
      console.log(error);
    }
  };

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
                Add address
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid
        md={12}
        mt={10}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            marginBottom: "20px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="fullname" style={labelStyle}>
            Full Name
          </label>
          <input
            style={style}
            name="fullname"
            {...register("fullName", { required: true })}
          />
          {errors.phone && <p>Full name is required.</p>}
          <label htmlFor="phone" style={labelStyle}>
            Phone
          </label>
          <input
            style={style}
            name="phone"
            type="number"
            {...register("phone", { required: true })}
          />
          {errors.phone && <p>Phone is required.</p>}

          <label htmlFor="street" style={labelStyle}>
            Street
          </label>
          <input
            style={style}
            name="street"
            {...register("street", { required: true })}
          />
          {errors.street && <p>Street is required.</p>}

          <label htmlFor="city" style={labelStyle}>
            City
          </label>
          <input
            style={style}
            name="city"
            {...register("city", { required: true })}
          />
          {errors.city && <p>City is required.</p>}

          <label htmlFor="state" style={labelStyle}>
            State
          </label>
          <input
            style={style}
            name="state"
            {...register("state", { required: true })}
          />
          {errors.state && <p>State is required.</p>}

          <label htmlFor="pincode" style={labelStyle}>
            Pincode
          </label>
          <input
            style={style}
            name="pincode"
            type="number"
            {...register("pincode", { required: true })}
          />
          {errors.pincode && <p>Pincode is required.</p>}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              width: "310px",
              height: "30px",
              borderRadius: "3px",
              backgroundColor: "#7E30E1",
              color: "#fff",
              border: "0",
              cursor: "pointer",
              fontFamily: "poppins",
            }}
          >
            Add address
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
        </form>
      </Grid>
    </>
  );
}

export default AddAddressPage;
