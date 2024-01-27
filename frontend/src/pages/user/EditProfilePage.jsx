import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
function EditProfilePage() {
  const navigate = useNavigate();
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
                  Edit profile
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid pt={10} pl={8} display={"flex"} flexDirection={"column"}>
        <Typography
          display={"flex"}
          alignItems={"center"}
          sx={{
            fontFamily: "montserrat",
            fontWeight: "600",
            cursor: "pointer",
            width: "50%",
          }}
          onClick={() => navigate("/user/profile/edit-profile/change-username")}
        >
          <ChangeCircleIcon sx={{ color: "#7E30E1", paddingRight: "10px" }} />
          Change username
        </Typography>
        <Typography
          mt={4}
          display={"flex"}
          alignItems={"center"}
          sx={{
            fontFamily: "montserrat",
            fontWeight: "600",
            cursor: "pointer",
            width: "50%",
          }}
          onClick={() => navigate("/user/profile/edit-profile/reset-password")}
        >
          <LockResetIcon sx={{ color: "#7E30E1", paddingRight: "10px" }} />{" "}
          Reset password
        </Typography>
      </Grid>
    </>
  );
}

export default EditProfilePage;
