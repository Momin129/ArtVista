import { Box } from "@mui/material";

export default function Profile() {
  return (
    <Box
      sx={{
        height: { md: 1 },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingY: { xs: 2, sm: 0 },
        paddingX: { xs: 1, sm: 0 },
      }}
    >
      Profile
    </Box>
  );
}
