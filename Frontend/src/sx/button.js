import { major, minor, textColor } from "./colors";

const minorButton = {
  backgroundColor: minor,
  color: "black",
  fontWeight: "bold",
  "&:hover": { backgroundColor: minor },
};

const majorButton = {
  backgroundColor: major,
  color: minor,
  fontWeight: "bold",
  "&:hover": { backgroundColor: major },
};
const inputField = {
  border: 1,
  color: textColor,
  borderColor: minor,
  borderRadius: 3,
  width: { xs: "100%", md: "80%" },
  "& fieldset": {
    border: "none",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: textColor,
  },
  "& .MuiInputBase-input": { color: textColor },
  input: { color: textColor },
  label: { color: textColor },
  "& .MuiFormHelperText-root": {
    whiteSpace: "pre-line",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    "-webkit-text-fill-color": textColor,
  },
};
export { minorButton, majorButton, inputField };
