/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { major, minor, textColor } from "../../sx/colors";
import { inputField, minorButton } from "../../sx/button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  backgroundColor: major,
  border: `2px solid ${minor}`,
  borderRadius: 3,
  color: textColor,
};

export default function OTPMail({ otpHandlers, inputHandlers }) {
  const [submitOtp, setSubmitOtp] = useState("");
  const [open, setOpen] = useState(false);

  const handleMessageClose = () => setOpen(false);
  const handleClose = () => otpHandlers.setOtp(false);
  const inputs = inputHandlers.inputs;

  const handleSubmit = () => {
    if (submitOtp === otpHandlers.otpMessage) {
      let obj = {
        fullname: inputs.fullname,
        email: inputs.email,
        mobile: inputs.mobile,
        password: inputs.password,
      };
      let url = `${import.meta.env.VITE_HOST}/api/user/register`;
      axios
        .post(url, obj)
        .then(() => {
          for (let item in inputs)
            inputHandlers.setInputs((values) => ({ ...values, [item]: "" }));
          inputHandlers.setDisabled(false);
          setOpen(true);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else console.log(false);
  };
  return (
    <div>
      <Modal open={otpHandlers.otp} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            OTP has been sent to {inputs.email}
          </Typography>
          <TextField
            type="text"
            sx={[inputField]}
            placeholder="OTP"
            onChange={(e) => setSubmitOtp(e.target.value)}
          />
          <Button variant="contained" sx={[minorButton]} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleMessageClose}
      >
        <Alert
          onClose={handleMessageClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Registration Successfull.
        </Alert>
      </Snackbar>
    </div>
  );
}
