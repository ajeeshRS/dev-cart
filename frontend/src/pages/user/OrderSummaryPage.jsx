import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function OrderSummaryPage() {
  const location = useLocation();
  const addressId = location.state.id;
  const navigate = useNavigate()
  

  return (
    <>
       <Grid md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            elevation={1}
            position="static"
            sx={{
              position: "fixed",
              top: "0px",
              zIndex: "1",
              bgcolor: "#7E30E1",
            }}
          >
            <Toolbar variant="dense">
              <IconButton
                onClick={() => navigate(-1)}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                Order Summary
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
    </>
  );
}

export default OrderSummaryPage;
