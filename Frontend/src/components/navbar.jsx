import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "./dropdown";
import SearchBox from "./user/searchBox";
import { textColor } from "../sx/colors";
import { centerAlign } from "../sx/container";

function NavBar() {
  const role = sessionStorage.getItem("role");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showOn, setShowOn] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      if (role == "user") setShowOn("user");
      else setShowOn("admin");
    } else setShowOn("home");
  }, [showOn, role]);

  const navLeftItems = [
    { name: "Home", link: "/", show: "home" },
    { name: "About", link: "/about", show: "home" },
    { name: "Dashboard", link: "/dashboard", show: "user" },
    { name: "Dashboard", link: "/admin", show: "admin" },
  ];

  const navRightItems = [
    { name: "Contact", link: "/contact", show: "home" },
    { name: "Login/Register", link: "/login", show: "home" },
    { name: "Profile", link: "/profile", show: "user" },
    { name: "Contact", link: "/contact", show: "user" },
    { name: "Upload", link: "/admin/upload", show: "admin" },
    { name: "Feedbacks", link: "/admin/feedbacks", show: "admin" },
    { name: "Logout", link: "/", show: "user" },
    { name: "Logout", link: "/", show: "admin" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    setShowOn("home");
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Button onClick={handleDrawerToggle}>Close</Button>
      <List>
        {navLeftItems.map(
          (item, index) =>
            showOn == item.show && (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  handleDrawerToggle();
                  navigate(item.link);
                }}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      <Divider />
      <Typography variant="h3" sx={{ my: 2 }}>
        ArtVista
      </Typography>
      <Divider />
      <List>
        {navRightItems.map(
          (item, index) =>
            showOn == item.show && (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  handleDrawerToggle();
                  if (item.name.toLowerCase() == "logout") {
                    handleLogout();
                  }
                  navigate(item.link);
                }}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      {showOn == "user" && <DropDown style={"sm"} />}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "fixed",
          backgroundColor: "#a7f1e6",
        }}
      >
        <Toolbar sx={[centerAlign, { gap: { md: 5 } }]}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLeftItems.map(
              (item, index) =>
                showOn == item.show && (
                  <Button
                    key={index}
                    sx={{ color: textColor, fontWeight: "bold" }}
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </Button>
                )
            )}
          </Box>
          {showOn == "user" && <DropDown style={"md"} />}
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "#0a423a",
              fontWeight: "bold",
              textShadow: "4px 4px 5px #116e60",
            }}
          >
            ArtVista
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navRightItems.map(
              (item, index) =>
                showOn == item.show && (
                  <Button
                    key={index}
                    sx={{ color: textColor, fontWeight: "bold" }}
                    onClick={() => {
                      if (item.name.toLowerCase() == "logout") {
                        handleLogout();
                      }
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </Button>
                )
            )}
          </Box>
          {showOn == "user" && <SearchBox />}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="nav">
        <Drawer
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 1,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavBar;
