import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAdminHeaders } from "../../utils/adminAuth";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
import ChartComponent from "../../components/ChartComponent/ChartComponent";
import { Grid, Typography } from "@mui/material";

function Dashboard() {
  const [orderData, setOrderData] = useState([]);

  const totalAmount = orderData
    .reduce((acc, order) => acc + order.amount / 100, 0)
    .toLocaleString();

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/admin/get/orders",
        {
          headers: getAdminHeaders(),
        }
      );
      console.log(response.data);
      setOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/all-products",
          {
            headers: getAdminHeaders(),
          }
        );
        setAdmin(response.data.admin);
        // console.log(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getAdmin();
  }, []);

  useEffect(() => {
    fetchOrderData();
  }, []);
  return (
    <>
      <AdminNavBar admin={admin} />
      <Grid container md={12} mt={10} width={"100%"} height={"80svh"}>
        <Grid
          md={6}
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ChartComponent />
        </Grid>
        <Grid
          md={6}
          item
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyItems={"space-around"}
          pt={5}
          pb={5}
        >
          <Grid
            md={6}
            container
            item
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "600",
                fontSize: "29px",
              }}
            >
              Total revenue
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              ₹ {totalAmount} /-
            </Typography>
          </Grid>
          <Grid
            md={6}
            container
            item
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "600",
                fontSize: "29px",
              }}
            >
              Gross sales
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              {orderData.length} Orders
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
