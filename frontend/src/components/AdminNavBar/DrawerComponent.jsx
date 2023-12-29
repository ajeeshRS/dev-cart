import {
  Menu,
  AccountCircle,
  Home,
  Storefront,
  Dashboard,
  Add,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        sx={{ width: "200px" }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <IconButton sx={{ color: "#0ecc25" }}>
                <AccountCircle />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontFamily: "montserrat", fontWeight: "600" }}>
                Admin
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton sx={{ color: "#0ecc25" }}>
                <Dashboard />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontFamily: "montserrat", fontWeight: "600" }}>
                Dashboard
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton sx={{ color: "#0ecc25" }}>
                <Storefront />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontFamily: "montserrat", fontWeight: "600" }}>
                All Products
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton sx={{ color: "#0ecc25" }}>
                <Add />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontFamily: "montserrat", fontWeight: "600" }}>
                Add Product
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
