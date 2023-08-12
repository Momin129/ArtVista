import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { host } from "../utility/host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  "& .MuiFormHelperText-root": {
    whiteSpace: "pre-line",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      inputs.length == 0 ||
      inputs.email.length == 0 ||
      inputs.password.length == 0
    ) {
      setMsg("Email and password required.");
      setOpen(true);
    } else {
      let obj = {
        email: inputs.email,
        password: inputs.password,
      };
      let url = `${host}/api/user/login`;

      axios
        .post(url, obj)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userId", result.data.id);
          navigate("/dashboard");
        })
        .catch((err) => {
          setMsg(err.response.data.message);
          setOpen(true);
        });
    }
  };
  return (
    <Box
      sx={{
        height: { md: 1 },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingY: { xs: 2, sm: 0 },
        paddingX: { xs: 1, sm: 0 },
      }}
    >
      <Box
        sx={{
          height: { md: 800 },
          width: { md: 700 },
          border: 2,
          borderColor: "#2dfdc6",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          padding: { xs: 5, md: 0 },
        }}
      >
        <Typography sx={{ fontSize: { xs: 28, md: 48 } }}>
          Log In to Your Account
        </Typography>
        <Typography sx={{ textAlign: "center", width: "80%" }}>
          Welcome back to ArtVista! Please log in below to continue your journey
          through the world of art and history.
        </Typography>

        <TextField
          name="email"
          value={inputs.email || ""}
          type="email"
          label="Email"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
        />

        <TextField
          name="password"
          value={inputs.password || ""}
          type="password"
          label="Password"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2dfdc6",
            "&:hover": { backgroundColor: "#2dfdc6" },
            color: "black",
            fontWeight: "bold",
            "&:disabled": { backgroundColor: "grey", color: "white" },
          }}
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Typography variant="h5">OR</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2dfdc6",
            "&:hover": { backgroundColor: "#2dfdc6" },
            color: "black",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
      <Snackbar
        autoHideDuration={8000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
