import React from "react";
import "./UserSignup.css";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  notify,
  notifyAccount,
  notifyBadRequest,
  notifyPasswordErr,
  notifyUserExists,
} from "../../../utils/toastify";

function UserSignup() {
  const [userFormData, setuserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nullData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    try {
      const isMatch = userFormData.password === userFormData.confirmPassword;

      if (isMatch) {
        const response = await axios.post("http://localhost:3001/user/signup", {
          userFormData,
        });

        if (response.status === 200) {
          notifyAccount();
        }
        setuserFormData(nullData);
      } else {
        notifyPasswordErr();
      }
    } catch (err) {
      if (err.status === 401) {
        notifyBadRequest();
      } else {
        notifyUserExists();
      }
    }
  };

  const valueChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setuserFormData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <Grid
      md={12}
      width={"100%"}
      height={"90svh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid pb={5}>
        <Typography
          sx={{ fontFamily: "montserrat", fontWeight: 600, fontSize: "22px" }}
        >
          User Signup
        </Typography>
      </Grid>
      <Grid md={12} display={"flex"} flexDirection={"column"}>
        <form
          onSubmit={submitUserData}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={valueChange}
            value={userFormData.email}
            placeholder="enter your email"
            className="signup-form"
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userFormData.username}
            onChange={valueChange}
            placeholder="enter a username"
            className="signup-form"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            minLength={6}
            name="password"
            value={userFormData.password}
            onChange={valueChange}
            placeholder="enter password"
            className="signup-form"
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            minLength={6}
            name="confirmPassword"
            placeholder="confirm your password"
            onChange={valueChange}
            value={userFormData.confirmPassword}
            className="signup-form"
          />

          <Grid md={12} display={"flex"} justifyContent={"center"}>
            <Button
              className="signup-button"
              sx={{ marginTop: "15px" }}
              variant="contained"
              type="submit"
            >
              Signup
            </Button>
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
          </Grid>
        </form>
        <Grid md={12} display={"flex"} justifyContent={"center"} mt={3}>
          <Typography>
            Already have an account?{" "}
            <Link
              className="login-link"
              style={{ cursor: "pointer" }}
              to={"/user/login"}
            >
              Login
            </Link>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserSignup;
