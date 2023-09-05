import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const handleSearch = () => {
    if (!showInput) setShowInput(true);
    else if (searchContent.length > 0) {
      navigate("/searchPage", {
        state: { query: searchContent },
      });
      setShowInput(false);
    } else setShowInput(false);
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
          onChange={(e) => setSearchContent(e.target.value)}
        ></TextField>
      )}
      <SearchIcon onClick={handleSearch} />
    </Box>
  );
}
