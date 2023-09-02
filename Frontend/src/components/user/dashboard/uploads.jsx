/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteUserUpload } from "../../../utility/api";

export default function Uploads({ list, lastUploaded, setList }) {
  const navigate = useNavigate();

  const [uploadMsg, setUploadMsg] = useState("");
  const handleDeleteUpload = (id, currentIndex) => {
    console.log(id, currentIndex);
    (async () => {
      const response = await deleteUserUpload(id);
      console.log(response);
      if (response)
        setList((products) =>
          products.filter((_, index) => index !== currentIndex)
        );
    })();
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
        }}
      >
        Uploads
      </Typography>
      <Box sx={{ overflowY: "auto", scrollbarWidth: "thin", height: 1 }}>
        {list.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#2dfdc6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Upload Item
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Date of Upload
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#050215" }}>
                {list.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: 2,
                      borderColor: "#2fdfc6",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{ color: "white" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      {row.createdAt.substring(0, row.createdAt.indexOf("T"))}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color:
                          row.status === "Pending"
                            ? "yellow"
                            : row.status == "Aproved"
                            ? "#2fdfc6"
                            : "red",
                      }}
                      align="center"
                    >
                      {row.status}
                      {row.status == "Rejected" && (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginLeft: 3, fontWeight: "bold" }}
                          onClick={() => handleDeleteUpload(row._id, index)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}
          >
            NO UPLOADS
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2fdfc6",
          color: "#050215",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#2fdfc6" },
          "&:disabled": { backgroundColor: "grey" },
          marginTop: 3,
        }}
        onClick={() => {
          if (list.length > 0) {
            if (lastUploaded == "Pending")
              setUploadMsg(
                "You can't upload until last model is approved or rejected"
              );
            else navigate("/upload");
          } else navigate("/upload");
        }}
      >
        Upload New
      </Button>
      <Typography
        sx={{ fontWeight: "bold", color: "#2fdfc6", textAlign: "center" }}
      >
        {uploadMsg}
      </Typography>
    </>
  );
}
