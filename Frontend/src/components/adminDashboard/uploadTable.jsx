import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

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

function createData(title, email, dou, option) {
  return { title, email, dou, option };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "momin.rather@gmail.com",
    "23/06/2023",
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2fdfc6", color: "#050215", fontWeight: "bold" }}
    >
      View
    </Button>
  ),
  createData(
    "Ice cream sandwich",
    "momin.rather@gmail.com",
    "23/06/2023",
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2fdfc6", color: "#050215", fontWeight: "bold" }}
    >
      View
    </Button>
  ),
  createData(
    "Eclair",
    "momin.rather@gmail.com",
    "23/06/2023",
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2fdfc6", color: "#050215", fontWeight: "bold" }}
    >
      View
    </Button>
  ),
  createData(
    "Cupcake",
    "momin.rather@gmail.com",
    "23/06/2023",
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2fdfc6", color: "#050215", fontWeight: "bold" }}
    >
      View
    </Button>
  ),
  createData(
    "Gingerbread",
    "momin.rather@gmail.com",
    "23/06/2023",
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2fdfc6", color: "#050215", fontWeight: "bold" }}
    >
      View
    </Button>
  ),
];

export default function UplaodTable() {
  return (
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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.dou}</StyledTableCell>
              <StyledTableCell>{row.option}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
