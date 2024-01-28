import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import { notifyPasswordChange, notifyPasswordMatchError } from "../../utils/toastify";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const style = {
    width: "300px",
    height: "30px",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    marginTop: "5px",
    paddingLeft: "5px",
  };
  const labelStyle = {
    color: "grey",
  };
  const resetPassword = async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/user/reset-password",
        { data },
        {headers:getHeaders()}
      );
      if(response.status === 200){
        notifyPasswordChange()
        reset()
      }

    } catch (error) {
      if(error.response.status === 400){
        notifyPasswordMatchError()
      }
    }
  };

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
                  Reset password
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
          onSubmit={handleSubmit((data) => resetPassword(data))}
        >
          <Typography fontFamily={"montserrat"} fontWeight={600}>
            {null}
          </Typography>
          <input
            style={style}
            {...register("currentPassword", { required: true })}
            placeholder="Enter your current password"
          />
          {errors.currentPassword && <p style={{fontFamily:"montserrat",fontSize:"14px",paddingBottom:"12px"}}>This field is required.</p>}
          <input
            style={style}
            minLength={5}
            {...register("newPassword", { required: true })}
            placeholder="Enter your new password"
          />
          {errors.newPassword && <p style={{fontFamily:"montserrat",fontSize:"14px",paddingBottom:"12px"}}>This field is required.</p>}
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
          {null}
        </Typography>
      </Grid>
    </>
  );
}

export default ResetPasswordPage;
