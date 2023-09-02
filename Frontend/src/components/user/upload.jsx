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
import { StorageHost } from "../../utility/host";
import axios from "axios";

const upload = {
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

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [inputs, setInputs] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

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
      inputs.info.length == 0
    ) {
      setMsg("Please fill all fields");
      setOpen(true);
      setSuccess(false);
    } else {
      const userId = sessionStorage.getItem("userId");
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", inputs.title);
      formData.append("thumbnail", inputs.thumbnail);
      formData.append("info", inputs.info);
      formData.append("type", inputs.type);
      formData.append("file", file);

      try {
        await axios
          .post(`${StorageHost}/api/userUpload`, formData)
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
    <Box
      sx={{
        height: 1,
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: { md: 600 },
          border: 2,
          borderColor: "#2dfdc6",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          padding: { xs: 2, md: 1 },
        }}
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
          sx={upload}
        />
        <TextField
          label="Information about the model"
          variant="outlined"
          name="info"
          value={inputs.info || ""}
          onChange={handleChange}
          sx={upload}
          multiline
          rows={5}
        />
        <InputLabel sx={{ color: "white" }}>Thumbnail for model</InputLabel>
        <TextField
          name="thumbnail"
          type="file"
          sx={upload}
          onChange={handleThumbnail}
        />
        <InputLabel sx={{ color: "white" }}>Model File</InputLabel>
        <TextField type="file" sx={upload} onChange={handleFile} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2dfdc6",
            "&:hover": { backgroundColor: "#2dfdc6" },
            color: "black",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
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
