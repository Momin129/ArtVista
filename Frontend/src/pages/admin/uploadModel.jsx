import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectType from "../../components/user/dropdown";
import { inputField, minorButton } from "../../sx/button";
import { size, centerAlign, stack, roundBorder } from "../../sx/container";
import { textColor } from "../../sx/colors";
import { useLocation } from "react-router-dom";

export default function UploadModel() {
  const { state } = useLocation();
  const { id, title, info } = state ?? "";

  const [file, setFile] = useState();
  const [inputs, setInputs] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setInputs((values) => ({ ...values, ["title"]: title }));
      setInputs((values) => ({ ...values, ["info"]: info }));
      setInputs((values) => ({ ...values, ["type"]: "userUploads" }));
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleThumbnail = (event) => {
    const data = new FileReader();
    data.readAsDataURL(event.target.files[0]);
    data.addEventListener("load", () => {
      setInputs((values) => ({ ...values, [event.target.name]: data.result }));
    });
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (
      inputs.length == 0 ||
      inputs.title.length == 0 ||
      inputs.info.length == 0 ||
      inputs.type.length == 0
    ) {
      setMsg("Please fill all fields");
      setOpen(true);
      setSuccess(false);
    } else {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("thumbnail", inputs.thumbnail);
      formData.append("info", inputs.info);
      formData.append("type", id ? "userUploads" : inputs.type);
      formData.append("file", file);
      id ? formData.append("upload_id", id) : "";

      try {
        await axios
          .post(`${import.meta.env.VITE_HOST}/api/admin/uploadModel`, formData)
          .then((result) => {
            setMsg(result.data.message);
            setSuccess(true);
            setOpen(true);
          });
        for (let item in inputs)
          setInputs((values) => ({ ...values, [item]: "" }));
      } catch (error) {
        console.log(error);
        setMsg(error.response.data.message);
        setSuccess(false);
        setOpen(true);
      }
    }
  };
  return (
    <Box sx={[size, centerAlign, stack]}>
      <Box
        sx={[
          roundBorder,
          centerAlign,
          stack,
          {
            width: { md: 600 },
            gap: 3,
            padding: { xs: 2, md: 1 },
          },
        ]}
      >
        <Typography sx={{ fontSize: { xs: 48, md: 64 } }}>
          Upload Model
        </Typography>
        <TextField
          label="Title of Model"
          variant="outlined"
          name="title"
          value={inputs.title || ""}
          onChange={handleChange}
          sx={inputField}
        />
        <TextField
          label="Information about the model"
          variant="outlined"
          name="info"
          value={inputs.info || ""}
          onChange={handleChange}
          sx={inputField}
          multiline
          rows={5}
        />
        <SelectType inputs={inputs} handleChange={handleChange} id={id} />
        <InputLabel sx={{ color: textColor }}>Thumbnail for model</InputLabel>
        <TextField
          name="thumbnail"
          type="file"
          sx={inputField}
          onChange={handleThumbnail}
        />
        <InputLabel sx={{ color: textColor }}>Model File</InputLabel>
        <TextField type="file" sx={inputField} onChange={handleFile} />
        <Button variant="contained" sx={[minorButton]} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
