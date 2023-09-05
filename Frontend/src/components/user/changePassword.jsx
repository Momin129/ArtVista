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
import { inputField } from "../../sx/button";
import { major, minor, textColor } from "../../sx/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    let url = `${import.meta.env.VITE_HOST}/api/user/changePassword`;
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
        PaperProps={{
          style: {
            backgroundColor: major,
            color: textColor,
            border: 2,
            borderColor: minor,
          },
        }}
      >
        <DialogTitle>{"Change Password"}</DialogTitle>
        <DialogContent>
          <Box
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
              sx={inputField}
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
              sx={inputField}
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
