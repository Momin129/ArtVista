/* eslint-disable react/prop-types */
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  Modal,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { sendReply } from "../../../utility/api/admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 500 },
  height: "max-content",
  overflow: "auto",
  bgcolor: "#050215",
  border: "2px solid #2fdfc6",
  borderRadius: 3,
  color: "white",
  p: 4,
  scrollbarWidth: "thin",
  scrollbarColor: "#2fdfc6 #050215",
};

// eslint-disable-next-line react/prop-types
export default function FeedbackPopUp({ open, handleClose, currentFeedback }) {
  const [reply, setReply] = useState("");
  const [openMessage, setOpen] = useState(false);
  const handleReply = async () => {
    const response = await sendReply(currentFeedback, reply);
    if (response) {
      setOpen(true);
      handleClose();
    }
  };
  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              padding: 2,
              border: 1,
              borderRadius: 3,
              borderColor: "#2fdfc6",
              marginY: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Name:
            </Typography>
            <Typography variant="h6">{currentFeedback.fullname}</Typography>
          </Box>

          <Box
            sx={{
              padding: 2,
              border: 1,
              borderRadius: 3,
              borderColor: "#2fdfc6",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            <Typography sx={{ mt: 2, textAlign: "justify" }}>
              {currentFeedback.email}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: 2,
              border: 1,
              borderRadius: 3,
              borderColor: "#2fdfc6",
              marginY: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Comment:
            </Typography>
            <Typography
              sx={{
                mt: 2,
                textAlign: "justify",
                height: "80%",
                overflowY: "auto",
              }}
            >
              {currentFeedback.comment}
            </Typography>
          </Box>
          <TextField
            multiline
            rows={5}
            value={reply}
            label="Reply"
            sx={{
              border: 1,
              color: "white",
              borderColor: "#2dfdc6",
              borderRadius: 3,
              width: "100%",
              "& fieldset": {
                border: "none",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiInputBase-input": { color: "white" },
              input: { color: "white" },
              label: { color: "white" },
            }}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2fdfc6",
              color: "#050215",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#2fdfc6" },
              marginTop: 3,
              width: "100%",
            }}
            onClick={handleReply}
          >
            Send
          </Button>
        </Box>
      </Modal>
      <Snackbar
        autoHideDuration={4000}
        open={openMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Reply sent successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
