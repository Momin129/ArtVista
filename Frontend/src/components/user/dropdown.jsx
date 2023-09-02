/* eslint-disable react/prop-types */
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectType({ inputs, handleChange }) {
  const registeStyle = {
    border: 1,
    color: "white",
    borderColor: "#2dfdc6",
    borderRadius: 3,
    width: { xs: "100%", md: "80%" },
    "& fieldset": {
      border: "none",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": { color: "white" },
    input: { color: "white" },
    label: { color: "white" },
  };

  return (
    <FormControl sx={registeStyle}>
      <InputLabel>Type of model</InputLabel>
      <Select
        name="type"
        value={inputs.type || ""}
        onChange={handleChange}
      >
        <MenuItem value="painting">Painting</MenuItem>
        <MenuItem value="sculpture">Sculpture</MenuItem>
        <MenuItem value="artifact">Artifact</MenuItem>
        <MenuItem value="demo">Demo</MenuItem>
      </Select>
    </FormControl>
  );
}
