import { Box, Grid, Typography } from "@mui/material";
import CountBox from "../../components/adminDashboard/countBox";
import { useEffect, useState } from "react";
import axios from "axios";
import UplaodTable from "../../components/adminDashboard/uploadTable";
import { major, textColor } from "../../sx/colors";
import { centerAlign } from "../../sx/container";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_HOST}/api/admin/getNumbers`
        );
        setRecords(result.data.records);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: major,
        paddingY: { xs: 2, md: 5 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
          textAlign: "center",
          color: textColor,
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ paddingY: { md: 10 } }}>
        {records.length != 0
          ? records.map((value, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                sx={[centerAlign, { cursor: "pointer" }]}
              >
                <CountBox name={value.name} count={value.count} />
              </Grid>
            ))
          : "Loading..."}
      </Grid>
      <Typography
        sx={{
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
          textAlign: "center",
          color: textColor,
          marginTop: { xs: 5, md: 20 },
        }}
      >
        Upload Requests
      </Typography>
      <UplaodTable />
    </Box>
  );
}
