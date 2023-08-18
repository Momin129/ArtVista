import { Box, Grid, Typography } from "@mui/material";
import CountBox from "../../components/adminDashboard/countBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../utility/host";
import UplaodTable from "../../components/adminDashboard/uploadTable";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${host}/api/admin/getNumbers`);
        setRecords(result.data.records);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "#050215",
        paddingY: { xs: 2, md: 5 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
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
          color: "white",
          marginTop: { xs: 5, md: 20 },
        }}
      >
        Upload Requests
      </Typography>
      <UplaodTable />
    </Box>
  );
}
