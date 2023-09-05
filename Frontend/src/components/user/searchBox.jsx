import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { textColor } from "../../sx/colors";

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
        borderColor: "#0a423a",
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
              color: textColor,
            },
            input: { color: textColor },
          }}
          onChange={(e) => setSearchContent(e.target.value)}
        ></TextField>
      )}
      <SearchIcon onClick={handleSearch} sx={{ color: "#0a423a" }} />
    </Box>
  );
}
