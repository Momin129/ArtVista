/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { validateForm } from "../../utility/formValidation";
import { inputField, minorButton } from "../../sx/button";

export default function InputFileds() {
  const userId = sessionStorage.getItem("userId");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [inputDisable, setInputDisable] = useState(true);
  const [inputs, setInputs] = useState([
    { fullname: "", mobile: "", email: "" },
  ]);
  const [error, setError] = useState({
    fullname: "",
    email: "",
    mobile: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_HOST}/api/user/getUserDetails`,
          {
            params: { userId: sessionStorage.getItem("userId") },
          }
        );
        for (let item in result.data) {
          setInputs((values) => ({ ...values, [item]: result.data[item] }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const Style = {
    border: 1,
    color: "white",
    borderColor: inputDisable ? "transparent" : "#2fdfc6",
    borderRadius: 3,
    width: { xs: "100%", md: "100%" },
    "& fieldset": {
      border: "none",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": { color: "white", fontSize: { xs: 20, md: 32 } },
    input: { color: "white" },
    label: { color: "white" },
    "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
      "-webkit-text-fill-color": "white",
    },
    "& .MuiFormHelperText-root": {
      whiteSpace: "pre-line",
    },
  };

  useEffect(() => {
    if (inputs) {
      let valid = false;
      for (let item in error) {
        if (error[item].length != 0 || !inputs[item]) valid = true;
      }
      setButtonDisable(valid);
    } else setButtonDisable(true);
  }, [inputs, error]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    handleBlur(event);
  };

  const handleBlur = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let returnMsg = await validateForm(userId, name, value);
    setError((values) => ({ ...values, [name]: returnMsg }));
  };

  const handleSubmit = async () => {
    const obj = {
      id: userId,
      fullname: inputs.fullname,
      email: inputs.email,
      mobile: inputs.mobile,
    };
    let url = `${import.meta.env.VITE_HOST}/api/user/updateUserDetails`;
    axios
      .post(url, obj)
      .then(() => {
        setButtonDisable(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: { xs: 20, md: 32 }, fontWeight: "bold" }}>
          Name:
        </Typography>
        <TextField
          error={error.fullname == "" ? false : true}
          helperText={error.fullname}
          name="fullname"
          value={inputs.fullname || ""}
          sx={inputField}
          disabled={inputDisable}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Divider sx={{ width: 1, borderColor: "#2dfdc6" }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: { xs: 20, md: 32 }, fontWeight: "bold" }}>
          Email:
        </Typography>
        <TextField
          error={error.email == "" ? false : true}
          helperText={error.email}
          name="email"
          value={inputs.email || ""}
          sx={inputField}
          disabled={inputDisable}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Divider sx={{ width: 1, borderColor: "#2dfdc6" }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: { xs: 20, md: 32 }, fontWeight: "bold" }}>
          Mobile:
        </Typography>
        <TextField
          error={error.mobile == "" ? false : true}
          helperText={error.mobile}
          name="mobile"
          value={inputs.mobile || ""}
          sx={inputField}
          disabled={inputDisable}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Divider sx={{ width: 1, borderColor: "#2dfdc6" }} />
      {inputDisable ? (
        <Button
          variant="contained"
          sx={[minorButton]}
          onClick={() => setInputDisable(false)}
        >
          Update Details
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setInputDisable(true)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={[
              minorButton,
              { "&:disabled": { backgroundColor: "grey", color: "white" } },
            ]}
            disabled={buttonDisable}
            onClick={() => {
              handleSubmit();
              setInputDisable(true);
            }}
          >
            Save Details
          </Button>
        </>
      )}
    </>
  );
}
