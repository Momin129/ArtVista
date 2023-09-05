/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { major, minor, textColor } from "../../sx/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 500 },
  height: { xs: 350, md: 500 },
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
export default function PopUp({ open, handleClose, currentModel }) {
  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ borderBottom: 1, borderBottomColor: minor }}
          >
            {currentModel.title}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            {currentModel.info}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
