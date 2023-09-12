/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "@mui/material";
import { minorButton } from "../../sx/button";
import { centerAlign, stack } from "../../sx/container";
import { major } from "../../sx/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "95%",
  bgcolor: major,
  p: 1,
  zIndex: 1,
  overflowY: "auto",
};

export default function Sidebar({
  open,
  handleClose,
  data,
  selectedIndex,
  handleModelChange,
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={[centerAlign, stack, { padding: 1 }]}>
            <Button
              variant="contained"
              sx={[minorButton, { marginBottom: 2 }]}
              onClick={handleClose}
            >
              Close
            </Button>
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Models
            </Typography>
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: 300,
                  height: 300,
                  overflow: "hidden",
                  border: selectedIndex == index ? 4 : 0,
                  borderColor: "#2fdfc6",
                  marginTop: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.thumbnail}
                  sx={{
                    width: 1,
                    height: 1,
                    objectFit: "fill",
                  }}
                  onClick={() => {
                    handleModelChange(index);
                    handleClose();
                  }}
                ></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
