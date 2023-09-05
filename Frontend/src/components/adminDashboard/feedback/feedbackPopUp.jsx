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
import { roundBorder } from "../../../sx/container";
import { inputField, minorButton } from "../../../sx/button";
import { major, minor, textColor } from "../../../sx/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 500 },
  height: "max-content",
  overflow: "auto",
  bgcolor: major,
  border: `2px solid ${minor}`,
  borderRadius: 3,
  color: textColor,
  p: 4,
  scrollbarWidth: "thin",
  scrollbarColor: `${minor} ${major}`,
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
            sx={[
              roundBorder,
              {
                padding: 2,
                marginY: 1,
              },
            ]}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Name:
            </Typography>
            <Typography variant="h6">{currentFeedback.fullname}</Typography>
          </Box>

          <Box sx={[roundBorder, { padding: 2 }]}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            <Typography sx={{ mt: 2, textAlign: "justify" }}>
              {currentFeedback.email}
            </Typography>
          </Box>

          <Box
            sx={[
              roundBorder,
              {
                padding: 2,
                marginY: 1,
              },
            ]}
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
            sx={[inputField, { width: { md: 1 } }]}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button
            variant="contained"
            sx={[minorButton, { width: 1, marginTop: 3 }]}
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
