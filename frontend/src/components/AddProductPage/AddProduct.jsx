import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./AddProduct.css";
import { useState } from "react";
import axios from "axios";
import { getAdminHeaders } from "../../utils/adminAuth";

function AddProduct({ admin }) {
  const [productData, setProductData] = useState({
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
    setProductData(nullData);
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
      setProductData((prevData) => ({ ...prevData, [name]: file }));
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  //getting token from localStorage
  const token = localStorage.getItem("adminAccessToken");

  //function to send data to backend
  const addProductDetails = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append other fields from productData
    formDataToSend.append("title", productData.title);
    formDataToSend.append("brand", productData.brand);
    formDataToSend.append("category", productData.category);
    formDataToSend.append("description", productData.description);
    formDataToSend.append("price", productData.price);

    // Append the image file
    formDataToSend.append("image", productData.image);
    // console.log(formDataToSend);
    try {
      await axios.post(
        "http://localhost:3001/admin/add-product",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Including admin token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Product added successfully");
      resetFormData(); // Reset the form after a successful submission
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
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
              ADD PRODUCT
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
              method="post"
              className="form-el"
              onSubmit={addProductDetails}
              encType="multipart/form-data"
            >
              <label>Title</label>
              <input
                className="input-el"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
              />

              <label>Brand</label>
              <input
                className="input-el"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
              />

              <label>Category</label>
              <input
                className="input-el"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              />

              <label>Description</label>
              <input
                className="input-el"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />

              <label>Price</label>
              <input
                className="input-el"
                name="price"
                value={productData.price}
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
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      ) : (
        <Grid md={12} width={"100%"} height={"90svh"} pt={10}>
          <Typography>This is a private route</Typography>
          <Link to={"/admin/login"}>Please login</Link>
        </Grid>
      )}
    </div>
  );
}

export default AddProduct;
