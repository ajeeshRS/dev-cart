import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import { ToastContainer } from "react-toastify";
import { notifyOrderCancel } from "../../utils/toastify";

function UserOrderPage() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/user/get/orders",
        {
          headers: getHeaders(),
        }
      );

      if (response) {
        setOrderData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/delete/order/${orderId}`,
        {
          headers: getHeaders(),
        }
      );
      if (response) {
        setOrderData((prevData) =>
          prevData.filter((order) => order.orderId !== orderId)
        );
        notifyOrderCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
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
                  Your orders
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      {orderData.length > 0 ? (
        orderData.map((item) => (
          <Grid
            md={12}
            sx={{ cursor: "pointer" }}
            padding={6}
            pt={10}
            border={"1px solid #F8FAE5"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"100%"}
            p={5}
          >
            <Grid md={4} width={"400px"}>
              <img
                className="product-img"
                src={`http://localhost:3001/uploads/${item.productDetails[0].image.filename}`}
                alt="product-image"
              />
            </Grid>
            <Link to={`/user/profile/orders/view-order/${item.orderId}`}>
              <Grid
                md={4}
                position={"absolute"}
                left={300}
                display={"flex"}
                height={"150px"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                sx={{ textDecoration: "none" }}
                color={"black"}
              >
                <Grid>
                  <Typography
                    fontFamily={"poppins"}
                    color={"#607274"}
                    fontWeight={500}
                  >
                    Order #
                  </Typography>
                  <Typography
                    fontFamily={"poppins"}
                    color={"black"}
                    fontWeight={500}
                  >
                    {item.orderId}
                  </Typography>
                  <Typography
                    fontFamily={"poppins"}
                    color={"black"}
                    fontWeight={500}
                  >
                    {item.productDetails.length} Items
                  </Typography>
                </Grid>
                <Typography fontFamily={"montserrat"} pb={4} fontWeight={600}>
                  Total : ₹{item.amount / 100}
                </Typography>
              </Grid>
            </Link>
            <Grid
              md={4}
              display={"flex"}
              height={"150px"}
              alignItems={"center"}
            >
              <button
                className="custom-btn"
                onClick={() => cancelOrder(item.orderId)}
              >
                Cancel
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
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid
          pt={10}
          width={"100%"}
          height={"90vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{ fontFamily: "montserrat", fontWeight: "500", color: "grey" }}
          >
            no orders here !
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default UserOrderPage;
