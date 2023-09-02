import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchAproveRequest,
  fetchRejectRequest,
  fetchUploadRequests,
} from "../../utility/api";
import PopUpModel from "./popUpModel";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2fdfc6",
    color: "#050215",
    border: "2px solid #2fdfc6",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: "#050215",
    border: "2px solid #2fdfc6",
    textAlign: "center",
    color: "white",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({}));

export default function UplaodTable() {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState({
    _id: "",
    title: "",
    info: "",
    path: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCurrentModel = (item) => {
    setCurrent((prev) => ({
      ...prev,
      _id: item._id,
      title: item.title,
      info: item.info,
      path: item.path,
    }));
    handleOpen();
  };

  const handleAprove = async (item, currentIndex) => {
    const response = await fetchAproveRequest(item._id);
    if (response) {
      setList((products) =>
        products.filter((_, index) => index !== currentIndex)
      );
    }
  };

  const handleReject = async (item, currentIndex) => {
    const filename = item.path.split("\\")[1];
    const response = await fetchRejectRequest(item._id, filename);
    if (response) {
      setList((products) =>
        products.filter((_, index) => index !== currentIndex)
      );
    }
  };

  useEffect(() => {
    (async () => {
      const list = await fetchUploadRequests();
      setList(list);
    })();
  }, []);
  return (
    <>
      {list.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ width: "95%", margin: "0 auto", marginTop: 5 }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Date of Upload</StyledTableCell>
                <StyledTableCell>Option</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    {row.createdAt.substring(0, row.createdAt.indexOf("T"))}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#2fdfc6",
                        color: "#050215",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#2fdfc6" },
                      }}
                      onClick={() => {
                        handleCurrentModel(row);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ fontWeight: "bold" }}
                      onClick={() => handleAprove(row, index)}
                    >
                      Aprove
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontWeight: "bold" }}
                      onClick={() => handleReject(row, index)}
                    >
                      Reject
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          NO UPLOADS
        </Typography>
      )}
      <PopUpModel
        open={open}
        currentModel={current}
        handleClose={handleClose}
      />
    </>
  );
}