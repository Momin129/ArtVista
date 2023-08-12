import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../utility/host";

const Style = {
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
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "white",
  },
};
export default function Profile() {
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState([
    { fullname: "", mobile: "", email: "", password: "Password" },
  ]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${host}/api/user/getUserDetails`, {
          params: { userId: sessionStorage.getItem("userId") },
        });
        for (let item in result.data) {
          setInputs((values) => ({ ...values, [item]: result.data[item] }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
        paddingY: { xs: 2, sm: 0 },
        paddingX: { xs: 1, sm: 0 },
      }}
    >
      <Box
        sx={{
          height: "60%",
          width: { xs: "90%", md: "40%" },
          boxShadow: "5px 5px 10px 0 #2fdfc6",
          padding: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography sx={{ fontSize: { xs: 36, md: 64 }, fontWeight: "bold" }}>
          My Profile
        </Typography>
        <TextField
          label="Name"
          name="fullname"
          type="text"
          value={inputs.fullname || ""}
          sx={Style}
          disabled={disabled}
        />
        <TextField
          label="Email"
          name="email"
          type="text"
          value={inputs.email || ""}
          sx={Style}
          disabled={disabled}
        />
        <TextField
          label="Mobile"
          name="mobile"
          type="text"
          value={inputs.mobile || ""}
          sx={Style}
          disabled={disabled}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={inputs.password || "Password"}
          sx={Style}
          disabled={disabled}
        />
        {!disabled && (
          <TextField
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            value={inputs.ConfirmPassword || ""}
            sx={Style}
            disabled={disabled}
          />
        )}

        {disabled ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2fdfc6",
              color: "#050215",
              fontWeight: "bold",
            }}
            onClick={() => setDisabled(false)}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2fdfc6",
              color: "#050215",
              fontWeight: "bold",
            }}
            onClick={() => setDisabled(true)}
          >
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
}
