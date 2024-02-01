import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import "./EditProduct.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditProduct({ admin }) {
  const { id } = useParams();

  const [updatedProductData, setUpdatedProductData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  // dummy data to empty state
  const nullData = {
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    image: null,
  };
  // reset form data after submit
  const resetFormData = () => {
    setUpdatedProductData(nullData);
    // Reset the input file element to clear its value
    const inputFile = document.querySelector('input[type="file"]');
    if (inputFile) {
      inputFile.value = "";
    }
  };

  // handling input changes
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setUpdatedProductData((prevData) => ({ ...prevData, [name]: file }));
    } else {
      setUpdatedProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const updateProductDetails = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminAccessToken");

    const formDataToSend = new FormData();

    // Append other fields from productData
    formDataToSend.append("title", updatedProductData.title);
    formDataToSend.append("brand", updatedProductData.brand);
    formDataToSend.append("category", updatedProductData.category);
    formDataToSend.append("description", updatedProductData.description);
    formDataToSend.append("price", updatedProductData.price);
    formDataToSend.append("image", updatedProductData.image);

    try {
      const res = await axios.patch(
        `http://localhost:3001/admin/edit-product/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        // console.log("product updated successfully");
        resetFormData();
      } else {
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const style = {
    width: "350px",
    height: "30px",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    marginTop: "5px",
    paddingLeft: "5px",
  };

  const labelStyle = {
    fontFamily: "montserrat",
    paddingLeft: "5px",
    fontWeight: "500",
    color: "grey",
  };

  return (
    <>
      {admin ? (
        <Grid md={12} width={"100%"} height={"90svh"} pt={7}>
          <Grid
            md={12}
            width={"100%"}
            height={"10svh"}
            display={"flex"}
            justifyContent={"center"}
            pt={3}
          >
            <Typography sx={{ fontFamily: "montserrat", fontWeight: 600 }}>
              EDIT PRODUCT
            </Typography>
          </Grid>
          <Grid
            md={12}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            pb={5}
          >
            <form
              method="patch"
              className="form-el"
              onSubmit={updateProductDetails}
              encType="multipart/form-data"
            >
              <label style={labelStyle}>Title</label>
              <input
                style={style}
                name="title"
                value={updatedProductData.title}
                onChange={handleInputChange}
              />

              <label style={labelStyle}>Brand</label>
              <input
                style={style}
                name="brand"
                value={updatedProductData.brand}
                onChange={handleInputChange}
              />

              <label style={labelStyle}>Category</label>
              <input
                style={style}
                name="category"
                value={updatedProductData.category}
                onChange={handleInputChange}
              />

              <label style={labelStyle}>Description</label>
              <input
                style={style}
                name="description"
                value={updatedProductData.description}
                onChange={handleInputChange}
              />

              <label style={labelStyle}>Price</label>
              <input
                style={style}
                name="price"
                value={updatedProductData.price}
                onChange={handleInputChange}
              />

              <label style={labelStyle}>Choose file</label>
              <input
                style={style}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />

              <button
                style={{
                  marginTop: "20px",
                  width: "360px",
                  height: "35px",
                  borderRadius: "3px",
                  backgroundColor: "#7E30E1",
                  color: "#fff",
                  border: "0",
                  cursor: "pointer",
                  fontFamily: "poppins",
                }}
                type="submit"
              >
                Update{" "}
              </button>
            </form>
          </Grid>
        </Grid>
      ) : (
        <Grid>Loading...</Grid>
      )}
    </>
  );
}

export default EditProduct;
