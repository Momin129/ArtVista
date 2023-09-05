import { major, minor } from "./colors";

const minorButton = {
  backgroundColor: minor,
  color: major,
  fontWeight: "bold",
  "&:hover": { backgroundColor: minor },
};

const inputField = {
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
  "& .MuiFormHelperText-root": {
    whiteSpace: "pre-line",
  },
};
export { minorButton, inputField };
