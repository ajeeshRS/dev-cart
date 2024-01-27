import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";

function SearchPage() {
  const { searchResults, updateSearchResults } = useSearchContext();
  const [sortBy, setSortBy] = useState("");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  if (sortBy == "l2h") {
    updateSearchResults(
      searchResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    );
  }
  if (sortBy == "h2l") {
    updateSearchResults(
      searchResults.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    );
  }

  useEffect(() => {}, [searchResults]);
  return (
    <div>
      <Grid
        md={12}
        width={"100%"}
        pt={1}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        height={"50px"}
        mt={5}
        bgcolor={"#fafafa"}
        pr={10}
      >
        <Typography fontFamily={"poppins"} pr={1}>
          Sort by:{" "}
        </Typography>
        <select
          name="sort-by"
          id="sort-by"
          onChange={handleChange}
          style={{
            width: "150px",
            height: "25px",
            border: "1px solid grey",
            borderRadius: "3px",
          }}
          defaultValue={"featured"}
        >
          <option value="featured">Featured</option>
          <option value="l2h">Price: Low to high</option>
          <option value="h2l">Price: High to low</option>
        </select>
      </Grid>
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
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
            bgcolor={"#fff"}
            p={5}
            key={item._id}
          >
            <Grid md={4} width={"400px"}>
              <img
                className="product-img"
                src={`http://localhost:3001/uploads/${item.image.filename}`}
                alt="product-image"
              />
            </Grid>
            <Link to={`/user/view-product/${item._id}`}>
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
                <Typography
                  fontFamily={"poppins"}
                  color={"#607274"}
                  fontWeight={500}
                >
                  {item.title}
                </Typography>
                <Typography fontFamily={"poppins"} fontWeight={500}>
                  {item.brand}
                </Typography>
                <Typography fontFamily={"poppins"} fontWeight={500}>
                  {item.description}
                </Typography>
                <Typography fontFamily={"montserrat"} fontWeight={600}>
                  ₹{item.price}
                </Typography>
              </Grid>
            </Link>
          </Grid>
        ))
      ) : (
        <Grid
          width={"100%"}
          height={"90svh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography>oops! no products found</Typography>
        </Grid>
      )}
    </div>
  );
}

export default SearchPage;
