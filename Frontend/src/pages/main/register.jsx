import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { validateForm } from "../../utility/formValidation";
import { host } from "../../utility/host";
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

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (inputs && inputs.password === inputs.confirmPassword) {
      let valid = false;
      for (let item in error) {
        if (error[item].length != 0 || !inputs[item]) valid = true;
      }
      setDisabled(valid);
    } else setDisabled(true);
  }, [inputs, error]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleBlur = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let returnMsg = await validateForm(undefined, name, value);
    if (name == "confirmPassword" && returnMsg == "") {
      if (value != inputs.password) returnMsg = "*Password does not match";
    }
    setError((values) => ({ ...values, [name]: returnMsg }));
  };

  const handleSubmit = async () => {
    let obj = {
      fullname: inputs.fullname,
      email: inputs.email,
      mobile: inputs.mobile,
      password: inputs.password,
    };
    let url = `${host}/api/user/register`;

    axios
      .post(url, obj)
      .then(() => {
        for (let item in inputs)
          setInputs((values) => ({ ...values, [item]: "" }));
        setDisabled(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
          Create Your Account
        </Typography>
        <Typography sx={{ textAlign: "center", width: "80%" }}>
          Welcome to ArtVista! By creating an account,
          {"you'll"} gain access to a world of artistic wonders and historical
          insights.
        </Typography>
        <TextField
          error={error.fullname == "" ? false : true}
          helperText={error.fullname}
          name="fullname"
          value={inputs.fullname || ""}
          type="text"
          label="Full Name"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          error={error.email == "" ? false : true}
          helperText={error.email}
          name="email"
          value={inputs.email || ""}
          type="email"
          label="Email"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          error={error.mobile == "" ? false : true}
          helperText={error.mobile}
          name="mobile"
          value={inputs.mobile || ""}
          type="text"
          label="Mobile Number"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          error={error.password == "" ? false : true}
          helperText={error.password}
          name="password"
          value={inputs.password || ""}
          type="password"
          label="Password"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          error={error.confirmPassword == "" ? false : true}
          helperText={error.confirmPassword}
          name="confirmPassword"
          value={inputs.confirmPassword || ""}
          type="password"
          label="Confirm Password"
          variant="outlined"
          sx={registeStyle}
          onChange={handleChange}
          onBlur={handleBlur}
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
          disabled={disabled}
          onClick={handleSubmit}
        >
          Create Account
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
          onClick={() => navigate("/login")}
        >
          Sign In
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
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Registration Successfull.
        </Alert>
      </Snackbar>
    </Box>
  );
}