import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBox() {
  const [showInput, setShowInput] = useState(false);
  const handleSearch = () => {
    if (!showInput) setShowInput(true);
  };
  return (
    <Box
      sx={{
        border: showInput ? 1 : "none",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {showInput && (
        <TextField
          size="small"
          sx={{
            "& fieldset": {
              border: "none",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "white",
            },
            input: { color: "white" },
          }}
        ></TextField>
      )}
      <SearchIcon onClick={handleSearch} />
    </Box>
  );
}
