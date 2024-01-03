import { Grid } from "@mui/material";
import React from "react";
import ViewMoreNav from "../../components/ViewMorePageNav/ViewMoreNav";
import ProductList from "../../components/ProductList/ProductList";
function ProductPageOnCategory() {
  return (
    <Grid md={12} width={"100%"}>
      <ViewMoreNav />
      <ProductList />
    </Grid>
  );
}

export default ProductPageOnCategory;
