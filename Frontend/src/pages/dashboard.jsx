import { Box, Button } from "@mui/material";
import Uploads from "../components/dashboard/uploads";
import { useState } from "react";
import Favourites from "../components/dashboard/favourites";

export default function Dashboard() {
  const [show, setShow] = useState(true);
  return (
    <Box
      sx={{
        height: { xs: 1, md: 1 },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "70%" },
          height: { xs: "80%", md: "80%" },
          padding: 5,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setShow(true)}
          >
            Favourites
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setShow(false)}
          >
            Uploads
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 3,
            height: "90%",
            padding: 2,
          }}
        >
          {show && <Favourites />}
          {!show && <Uploads />}
        </Box>
      </Box>
    </Box>
  );
}
