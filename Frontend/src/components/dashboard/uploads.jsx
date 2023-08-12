import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, date, status) {
  return { name, date, status };
}

const images = [
  {
    date: "23-07-2000",
    title: "Title 1",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 2",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 3",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 4",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 5",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 6",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 7",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 8",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 2",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 3",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 4",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 5",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 6",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 7",
    status: "Pending",
  },
  {
    date: "23-07-2000",
    title: "Title 8",
    status: "Pending",
  },
];

const rows = [];

images.forEach((item) => {
  rows.push(createData(item.title, item.date, item.status));
});

export default function Uploads() {
  return (
    <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
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
        <TableBody sx={{ backgroundColor: "#0b042f" }}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{ color: "white" }}
                align="center"
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                {row.date}
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
