import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../../utils/auth";
import easyinvoice from "easyinvoice";

function OrderConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetails = location.state.details;
  const paymentId = location.state.paymentId;
  const address = location.state.address;
  const addressString = `${address.phoneNo},${address.street},${address.state}`;
  const productDetails = orderDetails.productDetails;


    
    const generateInvoice = () => {

      try {
        
        const data = {
          documentTitle: "Invoice",
          currency: "INR",
          taxNotation: "vat",
          marginTop: 25,
          marginRight: 25,
          marginLeft: 25,
          marginBottom: 25,
          sender: {
            company: "DevCart",
            address: "123 Main Street",
            zip: "12345",
            city: "Palghat",
            country: "India",
          },
          client: {
            company: `${address.fullName}`,
            address: `${addressString}`,
            zip: `${address.pinCode}`,
            city: `${address.city}`,
            country: "India",
          },
          information: {
            number: '2021.0001',
            date: new Date().toLocaleDateString()
            
        },
    
          products: productDetails.map((product) => ({
            quantity: product.quantity,
            description: product.title,
            'tax-rate': 0, // in percentage
            price: product.price,
          })),

          'bottom-notice': "Thank you for your order!", // optional
        };
        easyinvoice.createInvoice(data, (result) => {
          easyinvoice.download("invoice.pdf", result.pdf);
        });
      } catch (error) {
        console.log(error)
      }
  
  }
  
  const addOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/user/order/add-order",
        { orderDetails, paymentId, address },
        {
          headers: getHeaders(),
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  useEffect(() => {
    addOrder();
  }, []);
  return (
    <>
      <Grid
        mt={8}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"90svh"}
        flexDirection={"column"}
        pb={10}
        data-aos="zoom-in"
      >
        <Typography pb={1}>
          <CheckCircleOutlineIcon
            sx={{ width: "80px", height: "80px", color: "#7E30E1" }}
          />
        </Typography>
        <Typography
          pb={1}
          sx={{ fontFamily: "montserrat", fontWeight: "500", fontSize: "25px" }}
        >
          Order Confirmed !
        </Typography>
        <Typography
          pb={3}
          sx={{
            fontFamily: "montserrat",
            fontWeight: "500",
            fontSize: "13px",
            color: "grey",
          }}
        >
          Your order has been placed succesfully
        </Typography>
        <Typography
          pb={3}
          sx={{
            fontFamily: "montserrat",
            fontWeight: "500",
            fontSize: "13px",
            color: "#6119BF",
            cursor: "pointer",
          }}
         onClick={()=>generateInvoice()}
        >
          Download invoice
        </Typography>
        <button className="custom-btn1" onClick={() => navigate("/user/home")}>
          Continue shopping
        </button>
      </Grid>
    </>
  );

  }
export default OrderConfirmPage;
