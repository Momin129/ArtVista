import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserDetails } from "../utility/api/userDetails";
import { inputField, minorButton } from "../sx/button";
import { centerAlign, roundBorder, size, stack } from "../sx/container";

export default function Contact() {
  const [inputs, setInputs] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      (async () => {
        const response = await getUserDetails();
        setInputs((values) => ({ ...values, ["fullname"]: response.fullname }));
        setInputs((values) => ({ ...values, ["email"]: response.email }));
      })();
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      inputs.length == 0 ||
      inputs.fullname.length == 0 ||
      inputs.email.length == 0 ||
      inputs.comment.length == 0
    ) {
      setMsg("Please fill all fields");
      setOpen(true);
      setSuccess(false);
    } else {
      const obj = {
        fullname: inputs.fullname,
        email: inputs.email,
        comment: inputs.comment,
      };
      const url = `${import.meta.env.VITE_HOST}/api/contact`;
      await axios
        .post(url, obj)
        .then((result) => {
          for (let item in inputs)
            setInputs((values) => ({ ...values, [item]: "" }));
          setMsg(result.data.message);
          setSuccess(true);
          setOpen(true);
        })
        .catch((err) => {
          setMsg(err.response.data.message);
          setSuccess(false);
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
            height: { md: 600 },
            width: { md: 600 },
            gap: 3,
            padding: { xs: 5, md: 0 },
            backgroundColor: "#e9fcf9",
            boxShadow: "8px 8px 8px #0a423a",
          },
        ]}
      >
        <Typography sx={{ fontSize: { xs: 48, md: 64 } }}>
          Contact Us
        </Typography>
        <Typography sx={{ textAlign: "center", width: "80%" }}>
          Have questions, suggestions, or simply want to share your thoughts?{" "}
          {"We'd"} love to hear from you!
        </Typography>
        <TextField
          label="Full Name"
          variant="outlined"
          name="fullname"
          value={inputs.fullname || ""}
          onChange={handleChange}
          sx={inputField}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          sx={inputField}
        />
        <TextField
          label="Comment"
          multiline
          rows={4}
          name="comment"
          value={inputs.comment || ""}
          onChange={handleChange}
          sx={inputField}
        />
        <Button variant="contained" sx={[minorButton]} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
