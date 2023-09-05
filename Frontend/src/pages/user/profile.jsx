import { Box, Typography, Button } from "@mui/material";

import InputFileds from "../../components/user/inputFileds";
import { useState } from "react";
import ChangePassword from "../../components/user/changePassword";
import { minorButton } from "../../sx/button";
import { centerAlign, roundBorder, size, stack } from "../../sx/container";
import { minor } from "../../sx/colors";

export default function Profile() {
  const [openPass, setOpenPass] = useState(false);
  const handleClose = () => {
    setOpenPass(false);
  };
  return (
    <Box
      sx={[
        size,
        centerAlign,
        stack,
        {
          paddingY: { xs: 2, sm: 0 },
          paddingX: { xs: 1, sm: 0 },
        },
      ]}
    >
      <ChangePassword open={openPass} handleClose={handleClose} />
      <Box
        sx={[
          centerAlign,
          roundBorder,
          stack,
          {
            height: "auto",
            width: { md: 600 },
            gap: 3,
            padding: { xs: 5, md: 0 },
            paddingY: { xs: 5, md: 5 },
            boxShadow: "8px 8px 8px #0a423a",
          },
        ]}
      >
        <Typography
          sx={{
            fontSize: { xs: 36, md: 48 },
            fontWeight: "bold",
            borderBottom: 1,
            borderBottomColor: minor,
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
          <Button sx={[minorButton]} onClick={() => setOpenPass(true)}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
