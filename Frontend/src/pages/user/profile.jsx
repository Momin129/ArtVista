import { Box, Typography, Button } from "@mui/material";

import InputFileds from "../../components/user/inputFileds";
import { useState } from "react";
import ChangePassword from "../../components/user/changePassword";

export default function Profile() {
  const [openPass, setOpenPass] = useState(false);
  const handleClose = () => {
    setOpenPass(false);
  };
  return (
    <Box
      sx={{
        height: 1,
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingY: { xs: 2, sm: 0 },
        paddingX: { xs: 1, sm: 0 },
      }}
    >
      <ChangePassword open={openPass} handleClose={handleClose} />
      <Box
        sx={{
          height: "auto",
          width: { md: 600 },
          border: 2,
          borderColor: "#2dfdc6",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          padding: { xs: 5, md: 0 },
          paddingY: { xs: 5, md: 5 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 36, md: 64 },
            fontWeight: "bold",
            borderBottom: 1,
            borderBottomColor: "#2dfdc6",
          }}
        >
          My Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <InputFileds />
          <Button
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setOpenPass(true)}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
