import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { size, centerAlign, stack, roundBorder } from "../../sx/container";
import { inputField, minorButton } from "../../sx/button";
import axios from "axios";

export default function UploadUserModel() {
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const [inputs, setInputs] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFile = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async () => {
    if (
      inputs.length == 0 ||
      inputs.title.length == 0 ||
      inputs.info.length == 0
    ) {
      setMsg("Please fill all fields");
      setOpen(true);
      setSuccess(false);
    } else {
      const userId = sessionStorage.getItem("userId");
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("title", inputs.title);
      formData.append("info", inputs.info);
      for (const file of files) {
        formData.append("files", file);
      }
      try {
        await axios
          .post(
            `${import.meta.env.VITE_HOST}/api/userUploads/uploadImages`,
            formData
          )
          .then((result) => {
            setMsg(result.data.message);
            setSuccess(true);
            setOpen(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          });
        for (let item in inputs)
          setInputs((values) => ({ ...values, [item]: "" }));
      } catch (error) {
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
        <InputLabel sx={{ color: "black" }}>Images for model</InputLabel>
        <TextField
          name="files"
          type="file"
          sx={inputField}
          inputProps={{ multiple: true }}
          onChange={handleFile}
        />
        <Button sx={minorButton} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar
        autoHideDuration={2000}
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
