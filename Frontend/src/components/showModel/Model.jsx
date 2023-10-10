/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import GenerateModel from "../model";

export default function Model({ currentModel }) {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      {currentModel.filename != "" && (
        <GenerateModel currentModel={currentModel.filename} />
      )}
    </Box>
  );
}
