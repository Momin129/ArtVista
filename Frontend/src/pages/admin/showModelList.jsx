import { useLocation } from "react-router-dom";
import { TypesOfModel } from "../../hooks/typeOfModels";
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
  const onSuccess = (data) => {
    console.log(data);
  };
  const { state } = useLocation();
  const { type } = state;

  console.log(type);

  const { data, isLoading } = TypesOfModel(type, onSuccess);

  if (isLoading) {
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
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Option</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.info}</StyledTableCell>
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
      </Box>
    );
  }
}
