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
        console.log("product updated successfully");
        resetFormData();
      } else {
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {admin ? (
        <Grid md={12} width={"100%"} height={"90svh"} pt={10}>
          <Grid
            md={12}
            width={"100%"}
            height={"10svh"}
            display={"flex"}
            justifyContent={"center"}
            pt={5}
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
          >
            <form
              method="patch"
              className="form-el"
              onSubmit={updateProductDetails}
              encType="multipart/form-data"
            >
              <label>Title</label>
              <input
                className="input-el"
                name="title"
                value={updatedProductData.title}
                onChange={handleInputChange}
              />

              <label>Brand</label>
              <input
                className="input-el"
                name="brand"
                value={updatedProductData.brand}
                onChange={handleInputChange}
              />

              <label>Category</label>
              <input
                className="input-el"
                name="category"
                value={updatedProductData.category}
                onChange={handleInputChange}
              />

              <label>Description</label>
              <input
                className="input-el"
                name="description"
                value={updatedProductData.description}
                onChange={handleInputChange}
              />

              <label>Price</label>
              <input
                className="input-el"
                name="price"
                value={updatedProductData.price}
                onChange={handleInputChange}
              />

              <label>Choose file</label>
              <input
                className="input-el"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />

              <Button
                sx={{ width: "350px", marginTop: "15px" }}
                variant="contained"
                type="submit"
              >
                EDIT
              </Button>
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
