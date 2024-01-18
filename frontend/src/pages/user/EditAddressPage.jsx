import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getHeaders } from "../../utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer } from "react-toastify";

function EditAddressPage() {
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-address/${id}`,
        { data },
        {
          headers: getHeaders(),
        }
      );
      reset();
      if (response.status === 201) {
        navigate("/user/address/saved-addresses");
      }
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
                Update address
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
          <input style={style} name="fullname" {...register("fullName")} />
          <label htmlFor="phone" style={labelStyle}>
            Phone
          </label>
          <input
            style={style}
            name="phone"
            type="number"
            {...register("phone")}
          />

          <label htmlFor="street" style={labelStyle}>
            Street
          </label>
          <input style={style} name="street" {...register("street")} />

          <label htmlFor="city" style={labelStyle}>
            City
          </label>
          <input style={style} name="city" {...register("city")} />

          <label htmlFor="state" style={labelStyle}>
            State
          </label>
          <input style={style} name="state" {...register("state")} />

          <label htmlFor="pincode" style={labelStyle}>
            Pincode
          </label>
          <input
            style={style}
            name="pincode"
            type="number"
            {...register("pincode")}
          />

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
            Update address
          </button>
        </form>
      </Grid>
    </>
  );
}

export default EditAddressPage;
