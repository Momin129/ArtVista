/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
