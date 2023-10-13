/* eslint-disable react/prop-types */
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { inputField } from "../../sx/button";

export default function SelectType({ inputs, handleChange, id }) {
  return (
    <FormControl sx={inputField}>
      <InputLabel>Type of model</InputLabel>
      <Select
        name="type"
        value={id ? "userUploads" : inputs.type || ""}
        onChange={handleChange}
        disabled={id ? true : false}
      >
        <MenuItem value="painting">Painting</MenuItem>
        <MenuItem value="sculpture">Sculpture</MenuItem>
        <MenuItem value="artifact">Artifact</MenuItem>
        <MenuItem value="monumnet">Monument</MenuItem>
        {id && <MenuItem value="userUploads">User Uploads</MenuItem>}
      </Select>
    </FormControl>
  );
}
