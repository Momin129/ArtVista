import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { centerAlign } from "../sx/container";
import { major } from "../sx/colors";
const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Register", link: "/register" },
];
export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={[centerAlign,{
        backgroundColor: major,
        color: "white",
        paddingY: 5,
        borderTop: 1,
      }]}
    >
      <Typography sx={{ fontSize: 36, fontWeight: "bold" }}>
        ArtVista
      </Typography>
      {!sessionStorage.getItem("userId") && (
        <Box>
          {navItems.map((item, index) => (
            <Button
              key={index}
              sx={{ color: "#fff", fontWeight: "bold" }}
              onClick={() => {
                navigate(item.link);
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
