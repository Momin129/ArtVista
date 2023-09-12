/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { centerAlign, stack } from "../../sx/container";

export default function Information({ currentModel }) {
  return (
    <Box
      sx={[
        centerAlign,
        stack,
        {
          height: 400,
          width: "90%",
          border: "2px solid #2fdfc6",
          borderRadius: 3,
        },
      ]}
    >
      <Typography sx={{ fontSize: 36, fontWeight: "bold" }}>
        {currentModel.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 24,
          textAlign: "justify",
          height: 1,
          overflowY: "auto",
          scrollbarWidth: "thin",
          padding: 1,
        }}
      >
        {currentModel.info}
      </Typography>
    </Box>
  );
}
