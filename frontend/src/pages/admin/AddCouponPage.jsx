import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
import axios from "axios";
import { getAdminHeaders } from "../../utils/adminAuth";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import {
  notifyCouponAddedSuccess,
  notifyCouponAddingError,
} from "../../utils/toastify";

function AddCouponPage() {
  const {
    register,
    handleSubmit,
    reset,
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

  const addCoupon = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/add-coupon",
        { data },
        {
          headers: getAdminHeaders(),
        }
      );

      if (response.status == 201) {
        notifyCouponAddedSuccess();
        reset();
      }
    } catch (error) {
      
      notifyCouponAddingError(error.response.data);
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
  return (
    <>
      <AdminNavBar admin={admin} />
      <Grid
        height={"90svh"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          onSubmit={handleSubmit((data) => addCoupon(data))}
        >
          <Typography
            width={"100%"}
            textAlign={"center"}
            fontFamily={"montserrat"}
            fontWeight={600}
          >
            Add coupon
          </Typography>
          <label
            style={{
              fontFamily: "montserrat",
              paddingLeft: "5px",
              fontWeight: "500",
              color: "grey",
            }}
          >
            Coupon code
          </label>
          <input style={style} {...register("code", { required: true })} />
          {errors.couponCode && <p>This field is required.</p>}
          <label
            style={{
              fontFamily: "montserrat",
              paddingLeft: "5px",
              fontWeight: "500",
              color: "grey",
            }}
          >
            Discount percentage
          </label>
          <input
            style={style}
            {...register("discountPercentage", { required: true })}
          />
          {errors.discountPercentage && <p>This field is required.</p>}
          <label
            style={{
              fontFamily: "montserrat",
              paddingLeft: "5px",
              fontWeight: "500",
              color: "grey",
            }}
          >
            Expiry
          </label>
          <input
            style={style}
            type="Date"
            {...register("expiry", { required: true })}
          />
          {errors.expiry && <p>This field is required.</p>}
          <label
            style={{
              fontFamily: "montserrat",
              paddingLeft: "5px",
              fontWeight: "500",
              color: "grey",
            }}
          >
            Minimum purchase amount
          </label>
          <input
            style={style}
            {...register("minPurchaseAmount", { required: true })}
          />
          {errors.minPurchaseAmount && <p>This field is required.</p>}

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
            Create
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

export default AddCouponPage;
