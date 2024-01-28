import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { useState } from "react";
import axios from "axios";
function AdminLogin() {
  const navigate = useNavigate();
  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });

  const nullData = {
    email: "",
    password: "",
  };

  const valueChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAdminLoginData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const loginFormSubmission = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/admin/login", { adminLoginData })
      .then((response) => {
        // console.log(response.data);
        const adminAccessToken = response.data;
        localStorage.setItem("adminAccessToken", adminAccessToken);
        setAdminLoginData(nullData);
        navigate("/admin/all-products");
      })
      .catch((err) => {
        console.log(err);
      });
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
          Admin Login
        </Typography>
      </Grid>
      <Grid md={12} display={"flex"} flexDirection={"column"}>
        <form
          onSubmit={loginFormSubmission}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "12px",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onChange={valueChange}
            value={adminLoginData.email}
            type="text"
            id="email"
            placeholder="enter your email"
            className="login-form"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={valueChange}
            value={adminLoginData.password}
            type="password"
            id="password"
            placeholder="enter password"
            className="login-form"
          />

          <Grid md={12} mt={3} display={"flex"} justifyContent={"center"}>
            <button className="custom-btn" type="submit">
              Login
            </button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
