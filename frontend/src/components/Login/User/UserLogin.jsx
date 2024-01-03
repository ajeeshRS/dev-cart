import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";
import axios from "axios";
function UserLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const nullData = {
    email: "",
    password: "",
  };

  const submitLoginData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/user/login", { loginData })
      .then((response) => {
        console.log(response.data);
        // alert(response.data.accessToken);
        let token = response.data.accessToken;
        localStorage.setItem("token", token);
        if (token) {
          alert("login success");
          navigate("/user/home");
        }
      })
      .catch((err) => console.log(err.message));

    setLoginData(nullData);
  };

  const valueChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prevFields) => ({
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
      <Typography sx={{fontFamily:"montserrat",fontWeight:600,fontSize:"22px"}}>User Login</Typography>
      </Grid>
      <Grid md={12} display={"flex"} flexDirection={"column"}>
        <form
          onSubmit={submitLoginData}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="enter your email"
            className="login-form"
            name="email"
            onChange={valueChange}
            value={loginData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            className="login-form"
            name="password"
            onChange={valueChange}
            value={loginData.password}
          />

          <Grid md={12} display={"flex"} justifyContent={"center"}>
            <Button
              className="login-button"
              sx={{ marginTop: "15px" }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </form>

        <Grid md={12} display={"flex"} justifyContent={"center"} mt={3}>
          <Typography>
            Don&apos;t have an account?{" "}
            <Link
              className="signup-link"
              style={{ cursor: "pointer" }}
              to={"/user/signup"}
            >
              Signup
            </Link>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserLogin;
