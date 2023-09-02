/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 500 },
  height: { xs: 350, md: 500 },
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
export default function PopUp({ open, handleClose, currentModel }) {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ borderBottom: 1, borderBottomColor: "#2fdfc6" }}
          >
            {currentModel.title}
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 2, textAlign: "justify" }}
          >
            {currentModel.info}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
