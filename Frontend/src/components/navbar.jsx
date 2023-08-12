import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showOn, setShowOn] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      setShowOn("user");
    }
  }, [showOn, sessionStorage.getItem("userId")]);

  const navLeftItems = [
    { name: "Home", link: "/", show: "home" },
    { name: "About", link: "/about", show: "home" },
    { name: "Dashboard", link: "/dashboard", show: "user" },
    { name: "Feedback", link: "/feedback", show: "user" },
  ];

  const navRightItems = [
    { name: "Contact", link: "/contact", show: "home" },
    { name: "Register", link: "/register", show: "home" },
    { name: "Profile", link: "/profile", show: "user" },
    { name: "Logout", link: "/", show: "user" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navLeftItems.map(
          (item, index) =>
            showOn == item.show && (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  navigate(item.link);
                }}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ),
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
                  navigate(item.link);
                }}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ),
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "fixed",
          backgroundColor: "#050215",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { md: 5 },
          }}
        >
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
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </Button>
                ),
            )}
          </Box>
          <Typography variant="h4" component="div">
            ArtVista
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navRightItems.map(
              (item, index) =>
                showOn == item.show && (
                  <Button
                    key={index}
                    sx={{ color: "#fff", fontWeight: "bold" }}
                    onClick={() => {
                      if (item.name.toLowerCase() == "logout") {
                        localStorage.removeItem("token");
                        sessionStorage.removeItem("userId");
                        setShowOn("home");
                      }
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </Button>
                ),
            )}
          </Box>
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
