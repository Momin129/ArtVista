import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { inputField, minorButton } from "../../sx/button";
import { centerAlign, roundBorder, size, stack } from "../../sx/container";
import { textColor } from "../../sx/colors";

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
      let url = `${import.meta.env.VITE_HOST}/api/user/login`;

      axios
        .post(url, obj)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userId", result.data.id);
          sessionStorage.setItem("role", result.data.role);
          console.log(result.data.role);
          result.data.role == "user"
            ? navigate("/dashboard")
            : navigate("/admin");
        })
        .catch((err) => {
          setMsg(err.response.data.message);
          setOpen(true);
        });
    }
  };
  return (
    <Box sx={[size, centerAlign, { padding: { xs: 2 } }]}>
      <Box
        sx={[
          roundBorder,
          centerAlign,
          stack,
          {
            height: { md: 800 },
            width: { md: 700 },
            gap: 3,
            padding: { xs: 5, md: 0 },
            boxShadow: "8px 8px 8px #0a423a",
          },
        ]}
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
          sx={inputField}
          onChange={handleChange}
        />

        <TextField
          name="password"
          value={inputs.password || ""}
          type="password"
          label="Password"
          variant="outlined"
          sx={inputField}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={[
            minorButton,
            {
              "&:disabled": { backgroundColor: "grey", color: textColor },
            },
          ]}
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Typography variant="h5">OR</Typography>
        <Button
          variant="contained"
          sx={[minorButton]}
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
