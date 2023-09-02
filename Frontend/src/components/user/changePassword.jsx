/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Box,
  TextField,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { validateForm } from "../../utility/formValidation";
import axios from "axios";
import { host } from "../../utility/host";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const changePasswordStyle = {
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

export default function ChangePassword({ open, handleClose }) {
  const [inputs, setInputs] = useState([{ password: "", confirmPassword: "" }]);
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [openMsg, setOpenMsg] = useState(false);
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
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
    const userId = sessionStorage.getItem("userId");
    const obj = { id: userId, password: inputs.password };
    let url = `${host}/api/user/changePassword`;
    axios
      .post(url, obj)
      .then((result) => {
        setMsg(result.data.message);
        setSuccess(true);
        setOpenMsg(true);
        setDisable(true);
        handleClose();
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setSuccess(false);
        setOpenMsg(true);
        console.log(err);
      });
  };
  useEffect(() => {
    if (inputs && inputs.password === inputs.confirmPassword) {
      let valid = false;
      for (let item in error) {
        if (error[item].length != 0 || !inputs[item]) valid = true;
      }
      setDisable(valid);
    } else setDisable(true);
  }, [inputs, error]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "#050215",
            color: "white",
            border: 2,
            borderColor: "#2fdfc6",
          },
        }}
      >
        <DialogTitle>{"Change Password"}</DialogTitle>
        <DialogContent>
          <Box
            id="alert-dialog-slide-description"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              error={error.password == "" ? false : true}
              helperText={error.password}
              name="password"
              type="password"
              label="New Password"
              value={inputs.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={changePasswordStyle}
            />
            <TextField
              error={error.confirmPassword == "" ? false : true}
              helperText={error.confirmPassword}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={inputs.confirmPassword || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={changePasswordStyle}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            disabled={disable}
            sx={{ "&:disabled": { backgroundColor: "grey" } }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={8000}
        open={openMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setOpenMsg(false)}
      >
        <Alert
          onClose={() => setOpenMsg(false)}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
