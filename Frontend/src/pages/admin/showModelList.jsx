import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TableBody,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableRow,
  Paper,
  Table,
  TableHead,
  styled,
} from "@mui/material";
import { centerAlign, size } from "../../sx/container";
import { minorButton } from "../../sx/button";
import { major, textColor } from "../../sx/colors";
import { allDetails } from "../../hooks/getModelDetails";
import IndividualModel from "../../components/adminDashboard/individualModel";

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

export default function ShowModelList() {
  const { state } = useLocation();
  const { type } = state;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [current, setCurrent] = useState({});
  const { data, isLoading, isFetching, refetch } = allDetails(type);
  const navigate = useNavigate();

  const handleCurrentRow = (row) => {
    if (type == "userUploads" && !row.filename) {
      navigate("/admin/upload", {
        state: { id: row._id, title: row.title, info: row.info },
      });
    } else {
      setCurrent(row);
      handleOpen();
    }
  };

  if (isLoading || isFetching) {
    return <Box sx={[size, centerAlign]}>Loading...</Box>;
  } else {
    return (
      <Box sx={[size, centerAlign]}>
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
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 700, tableLayout: "fixed" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  {type == "user" ? "Name" : "Title"}
                </StyledTableCell>
                <StyledTableCell>
                  {type == "user" ? "Email" : "Description"}
                </StyledTableCell>
                <StyledTableCell>Option</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.title ? row.title : row.fullname}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        width: "50%",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.info ? row.info : row.email}
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
                        sx={[minorButton]}
                        onClick={() => {
                          handleCurrentRow(row);
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
        <IndividualModel
          open={open}
          setOpen={setOpen}
          current={current}
          type={type}
          refetch={refetch}
        />
      </Box>
    );
  }
}
