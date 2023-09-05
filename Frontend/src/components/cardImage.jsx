/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function CardImage({ source }) {
  return (
    <Box
      component="img"
      src={source}
      sx={{ objectFit: "contain", width: 1, height: "50%" }}
    ></Box>
  );
}
