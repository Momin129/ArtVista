/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import GenerateModel from "../model";

import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import PopUp from "./popUp";
import { major, minor } from "../../sx/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, md: 600 },
  height: 600,
  backgroundColor: major,
  border: `2px solid ${minor}`,
  borderRadius: 3,
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  p: 4,
};

// eslint-disable-next-line react/prop-types
export default function PopUpModel({ open, handleClose, currentModel }) {
  const [openInfo, setOpen] = useState(false);
  const handleOpenInfo = () => setOpen(true);
  const handleCloseInfo = () => setOpen(false);

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
          {currentModel.path != "" && (
            <Box sx={{ width: "90%", height: "80%" }}>
              <GenerateModel currentModel={currentModel.path} />
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InfoIcon
              onClick={handleOpenInfo}
              sx={{ color: minor, fontSize: 36 }}
            />
          </Box>
          <PopUp
            open={openInfo}
            handleClose={handleCloseInfo}
            currentModel={currentModel}
          />
        </Box>
      </Modal>
    </div>
  );
}
