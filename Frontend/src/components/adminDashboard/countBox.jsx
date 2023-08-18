/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AppsIcon from "@mui/icons-material/Apps";
import ContactsIcon from "@mui/icons-material/Contacts";
export default function CountBox({ name, count }) {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: "#2dfdc6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 5,
        boxShadow: "10px 10px 0px #0e584d",
        color: "#050215",
      }}
    >
      {name == "Users" && <PeopleAltIcon sx={{ fontSize: 84 }} />}
      {name == "Paintings" && <ColorLensIcon sx={{ fontSize: 84 }} />}
      {name == "Sculptures" && <SelfImprovementIcon sx={{ fontSize: 84 }} />}
      {name == "Artifacts" && <ViewInArIcon sx={{ fontSize: 84 }} />}
      {name == "Demo" && <AppsIcon sx={{ fontSize: 84 }} />}
      {name == "Contact" && <ContactsIcon sx={{ fontSize: 84 }} />}
      <Typography sx={{ fontSize: { xs: 20, md: 20 } }}>{name}</Typography>
      <Typography sx={{ fontSize: { xs: 48, md: 48 }, fontWeight: "bold" }}>
        {count}
      </Typography>
    </Box>
  );
}
