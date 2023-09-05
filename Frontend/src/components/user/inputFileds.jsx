/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { validateForm } from "../../utility/formValidation";
import { inputField, minorButton } from "../../sx/button";
import { minor, textColor } from "../../sx/colors";

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
        <Typography
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: "bold",
            color: "#158474",
            textShadow: "1px 1px 2px black",
          }}
        >
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
      <Divider sx={{ width: 1, borderColor: minor }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: "bold",
            color: "#158474",
            textShadow: "1px 1px 2px black",
          }}
        >
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
      <Divider sx={{ width: 1, borderColor: minor }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: "bold",
            color: "#158474",
            textShadow: "1px 1px 2px black",
          }}
        >
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
      <Divider sx={{ width: 1, borderColor: minor }} />
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
            sx={[minorButton]}
            onClick={() => setInputDisable(true)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={[
              minorButton,
              { "&:disabled": { backgroundColor: "grey", color: textColor } },
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
