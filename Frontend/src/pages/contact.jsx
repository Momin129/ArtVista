import { Box, Button, TextField, Typography } from "@mui/material";

const contact = {
  border: 1,
  color: "white",
  borderColor: "#2dfdc6",
  borderRadius: 3,
  width: { xs: "100%", md: "80%" },
  "& fieldset": {
    border: "none",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiInputBase-input": { color: "white" },
  input: { color: "white" },
  label: { color: "white" },
};

export default function Contact() {
  return (
    <Box
      sx={{
        height: 1,
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
          height: { md: 600 },
          width: { md: 600 },
          border: 2,
          borderColor: "#2dfdc6",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          padding: { xs: 5, md: 0 },
        }}
      >
        <Typography sx={{ fontSize: { xs: 48, md: 64 } }}>
          Contact Us
        </Typography>
        <Typography sx={{ textAlign: "center", width: "80%" }}>
          Have questions, suggestions, or simply want to share your thoughts?{" "}
          {"We'd"} love to hear from you!
        </Typography>
        <TextField label="Full Name" variant="outlined" sx={contact} />
        <TextField label="Email" variant="outlined" sx={contact} />
        <TextField label="Comment" multiline rows={4} sx={contact} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2dfdc6",
            "&:hover": { backgroundColor: "#2dfdc6" },
            color: "black",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
