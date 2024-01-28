import "./StdNavBar.css";
import {
  AppBar,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import DrawerComponent from "./DrawerComponent";

function StdNavBar() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="app-bar"
      sx={{
        height: "10svh",
        backgroundColor: "#fff",
      }}
    >
      <Grid
        md={12}
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"10svh"}
      >
        <Grid
          md={4}
          sx={{
            marginLeft: {
              xs: "10px",
              md: "20px",
              sm: "10px",
            },
          }}
          pl={"auto"}
        >
          <Typography
            sx={{
              color: "#262626",
              fontSize: {
                md: "30px",
                sm: "25px",
                xs: "25px",
              },
              fontWeight: "800",
              fontFamily: "Pacifico",
              cursor: "pointer",
            }}
          >
            DevCart{" "}
            <span className="span-el" style={{ color: "#7E30E1" }}>
              .
            </span>
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default StdNavBar;
