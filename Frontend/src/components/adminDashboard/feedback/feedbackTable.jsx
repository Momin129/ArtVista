/* eslint-disable react/prop-types */
import {
  TableBody,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableRow,
  Paper,
  Table,
  TableHead,
  Button,
  styled,
} from "@mui/material";
import { useState } from "react";
import FeedbackPopUp from "./feedbackPopUp";
import { major, minor, textColor } from "../../../sx/colors";
import { minorButton } from "../../../sx/button";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0a423a",
    color: major,
    border: `2px solid ${"#0a423a"}`,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: major,
    border: `2px solid ${"#0a423a"}`,
    textAlign: "center",
    color: textColor,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({}));
export default function FeedbackTable({ list }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentFeedback, setCurrentFeedback] = useState({});
  const handleCurrentFeedback = (item) => {
    setCurrentFeedback(item);
    handleOpen();
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "95%",
          margin: "0 auto",
          marginTop: 5,
          overflowY: "auto",
          height: "60%",
          scrollbarWidth: "thin",
          backgroundColor: major,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.fullname}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={[minorButton]}
                    onClick={() => {
                      handleCurrentFeedback(row);
                    }}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FeedbackPopUp
        open={open}
        handleClose={handleClose}
        currentFeedback={currentFeedback}
      />
    </>
  );
}
