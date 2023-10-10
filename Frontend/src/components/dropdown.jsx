/* eslint-disable react/prop-types */
import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DropDown({ style }) {
  const styleMd = {
    color: "black",
    fontWeight: "bold",
    display: { xs: "none", md: "block" },
  };

  const styleSm = {
    color: "black",
    display: { xs: "block", md: "none" },
    margin: "0 auto",
  };

  const positionMd = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 2,
    width: "max-content",
  };
  const positionSm = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "static",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 2,
  };

  const dropDownList = [
    { buttonName: "Paintings", type: "painting" },
    { buttonName: "Sculptures", type: "sculpture" },
    { buttonName: "Artifacts", type: "artifact" },
    { buttonName: "Monumnets", type: "monument" },
    { buttonName: "User Models", type: "user" },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          sx={style == "md" ? styleMd : styleSm}
          onClick={() => setOpen(!open)}
        >
          Collections
        </Button>
        {open && (
          <Box sx={style == "md" ? positionMd : positionSm}>
            {dropDownList.map((item) => (
              <>
                <Button
                  key={item.buttonName}
                  sx={{ color: "black" }}
                  onClick={() => {
                    setOpen(false);
                    navigate("/displayModels", {
                      state: { type: item.type },
                    });
                  }}
                >
                  {item.buttonName}
                </Button>
                <Divider sx={{ width: 1 }} />
              </>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
