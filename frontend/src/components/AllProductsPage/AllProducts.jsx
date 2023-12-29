import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import axios from "axios";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAdminHeaders } from "../../utils/adminAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AllProducts({ admin }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:3001/admin/all-products", {
        headers: getAdminHeaders(),
      })
      .then((response) => {
        setProducts(response.data.products);
        // console.log(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    await axios
      .delete(`http://localhost:3001/admin/delete-product/${productId}`, {
        headers: getAdminHeaders(),
      })
      .then((response) => {
        console.log(response.data);
        fetchProducts();
      })
      .catch((err) => console.error(err));
  };

  const sortedProducts = products.sort((a,b)=>a.price-b.price)

  return admin ? (
    <Grid md={12} width={"100%"} height={"90vh"} pt={15}>
      <Grid md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          fontFamily={"montserrat"}
          fontWeight={600}
          fontSize={"25px"}
        >
          All Products
        </Typography>
      </Grid>
      <Grid
        md={12}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Grid
          mt={5}
          md={12}
          ml={5}
          width={"98%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            fontFamily: "poppins",
          }}
        >
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Title
            </Typography>
          </Grid>
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Brand
            </Typography>
          </Grid>
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Category
            </Typography>
          </Grid>
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Description
            </Typography>
          </Grid>
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Price
            </Typography>
          </Grid>
          <Grid md={2} width={"100px"}>
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Image
            </Typography>
          </Grid>
          <Grid
            width={"100px"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Edit
            </Typography>

            <Typography fontFamily={"montserrat"} fontWeight={600}>
              Delete
            </Typography>
          </Grid>
        </Grid>
        {sortedProducts.map((product) => (
          <>
            <Grid
              className="container"
              mt={5}
              mb={5}
              key={product._id}
              md={12}
              width={"98%"}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                fontFamily: "poppins",
              }}
            >
              <Grid md={2} width={"100px"}>
                <Typography fontFamily={"montserrat"} fontWeight={600}>
                  {product.title}
                </Typography>
              </Grid>
              <Grid md={2} width={"100px"}>
                <Typography fontFamily={"montserrat"}>
                  {product.brand}
                </Typography>
              </Grid>
              <Grid md={2} width={"100px"}>
                <Typography fontFamily={"montserrat"}>
                  {product.category}
                </Typography>
              </Grid>
              <Grid md={2} width={"100px"}>
                <Typography fontFamily={"montserrat"}>
                  {product.description}
                </Typography>
              </Grid>
              <Grid md={2} width={"100px"}>
                <Typography fontFamily={"montserrat"}>
                  {product.price}
                </Typography>
              </Grid>
              <Grid md={2} width={"100px"}>
                <img
                  src={`http://localhost:3001/uploads/${product.image.filename}`}
                  alt="product-image"
                />
              </Grid>
              <Grid>
                <IconButton
                  onClick={() => {
                    handleEdit(product._id);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  style={{ color: "red" }}
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    </Grid>
  ) : (
    <Grid
      md={12}
      width={"100%"}
      height={"90vh"}
      pt={10}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography>Loading...</Typography>
    </Grid>
  );
}

export default AllProducts;
