/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ContactsIcon from "@mui/icons-material/Contacts";
import PublishIcon from "@mui/icons-material/Publish";

import { major } from "../../sx/colors";
import { useNavigate } from "react-router-dom";

export default function CountBox({ value }) {
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate("/admin/showModelsList", {
      state: { type: type },
    });
  };
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
        color: major,
        cursor: "pointer",
      }}
      onClick={() => {
        handleNavigate(value.type);
      }}
    >
      {value.name == "Users" && (
        <PeopleAltIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      {value.name == "Paintings" && (
        <ColorLensIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      {value.name == "Sculptures" && (
        <SelfImprovementIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      {value.name == "Artifacts" && (
        <ViewInArIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      {value.name == "User Uploads" && (
        <PublishIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      {value.name == "Feedbacks" && (
        <ContactsIcon sx={{ fontSize: 84, color: "black" }} />
      )}
      <Typography
        sx={{
          fontSize: { xs: 20, md: 20 },
          fontWeight: "bold",
          color: "black",
        }}
      >
        {value.name}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 48, md: 48 },
          fontWeight: "bold",
          color: "black",
        }}
      >
        {value.count}
      </Typography>
    </Box>
  );
}
