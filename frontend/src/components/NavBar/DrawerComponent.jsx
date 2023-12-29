import { Menu, AccountCircle, Home, Storefront } from "@mui/icons-material";
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
                User
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton sx={{ color: "#0ecc25" }}>
                <Home />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontFamily: "montserrat", fontWeight: "600" }}>
                Home
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
                Products
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
