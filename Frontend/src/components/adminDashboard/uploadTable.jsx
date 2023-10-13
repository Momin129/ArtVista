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
import { major, minor, textColor } from "../../sx/colors";
import { downloadZip } from "../../utility/api/admin";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: minor,
    color: major,
    border: `2px solid ${minor}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: major,
    border: `2px solid ${minor}`,
    textAlign: "center",
    color: textColor,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({}));

export default function UplaodTable() {
  const [list, setList] = useState([]);

  const handleCurrentModel = (item) => {
    (async () => {
      downloadZip(item.user_id);
    })();
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
    const response = await fetchRejectRequest(item._id);
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
                      sx={[minor]}
                      onClick={() => {
                        handleCurrentModel(row);
                      }}
                    >
                      Download
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
            color: "black",
          }}
        >
          NO UPLOADS
        </Typography>
      )}
    </>
  );
}
