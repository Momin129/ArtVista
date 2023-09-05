import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { validateForm } from "../../utility/formValidation";

import { useNavigate } from "react-router-dom";
import OTPMail from "../../components/register/otpMail";
import { setOTP } from "../../utility/api/register";
import { inputField, minorButton } from "../../sx/button";
import { centerAlign, roundBorder, size, stack } from "../../sx/container";
import { textColor } from "../../sx/colors";

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const handleOpenOTP = () => setOtp(true);

  const otpHandlers = { otp, otpMessage, setOtp };
  const inputHandlers = { inputs, setInputs, setDisabled };

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
    handleOpenOTP();
    (async () => {
      const response = await setOTP(inputs.email);
      setOtpMessage(response);
    })();
  };
  return (
    <Box sx={[size, centerAlign, { padding: { xs: 2 } }]}>
      <Box
        sx={[
          {
            height: { md: 800 },
            width: { xs: 600, md: 700 },
            gap: 3,
            padding: { xs: 5, md: 0 },
            boxShadow: "8px 8px 8px #0a423a",
          },
          roundBorder,
          centerAlign,
          stack,
        ]}
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
          sx={inputField}
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
          sx={inputField}
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
          sx={inputField}
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
          sx={inputField}
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
          sx={inputField}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          variant="contained"
          sx={[
            {
              "&:disabled": { backgroundColor: "grey", color: textColor },
            },
            minorButton,
          ]}
          disabled={disabled}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Typography variant="h5">OR</Typography>
        <Button
          variant="contained"
          sx={[minorButton]}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </Box>

      <OTPMail otpHandlers={otpHandlers} inputHandlers={inputHandlers} />
    </Box>
  );
}
