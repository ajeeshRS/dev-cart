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
import { useForm } from "react-hook-form";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import { ToastContainer } from "react-toastify";
import { notifyUsernameUpdated } from "../../utils/toastify";

function ChangeUsernamePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const style = {
    width: "300px",
    height: "35px",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    marginTop: "5px",
    paddingLeft: "5px",
  };

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/get", {
        headers: getHeaders(),
      });
      if (response) {
        setUserDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserName = async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/user/update-username",
        {
          data,
        },
        { headers: getHeaders() }
      );
      if (response.status === 200) {
        notifyUsernameUpdated();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
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
                  Change username
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid
        pt={8}
        height={"90svh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit((data) => updateUserName(data))}
        >
          <Typography fontFamily={"montserrat"} fontWeight={600}>
            Username
          </Typography>
          <input
            style={style}
            {...register("userName", { required: true })}
            placeholder="Enter your new username"
          />
          {errors.userName && <p>username is required.</p>}

          <button type="submit" style={{
              marginTop: "20px",
              width: "310px",
              height: "30px",
              borderRadius: "3px",
              backgroundColor: "#7E30E1",
              color: "#fff",
              border: "0",
              cursor: "pointer",
              fontFamily: "poppins",
            }}>
            Submit
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
        <Typography
          pt={10}
          fontFamily={"montserrat"}
          fontWeight={500}
          color={"grey"}
        >
          Note : You may want to re-login to view the updates
        </Typography>
      </Grid>
    </>
  );
}

export default ChangeUsernamePage;
