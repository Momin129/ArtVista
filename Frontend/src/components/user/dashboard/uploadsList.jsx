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
import { major, textColor } from "../../../sx/colors";
import { minorButton } from "../../../sx/button";
import axios from "axios";
import { getUserDetails } from "../../../utility/api/userDetails";

export default function UploadsList({ list, lastUploaded }) {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("userId");
  const [uploadMsg, setUploadMsg] = useState("");

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const checkoutHandler = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const {
      data: { key },
    } = await axios.get(`${import.meta.env.VITE_HOST}/api/getKey`);

    const {
      data: { order },
    } = await axios.post(`${import.meta.env.VITE_HOST}/api/payment/checkout`, {
      amount,
    });

    const details = await getUserDetails();

    console.log(details);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "ArtVista",
      description:
        "From Relics to 3D Realities: Rediscover Jammu and Kashmir's Past.",
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_HOST
      }/api/payment/paymentverification?user_id=${user_id}`,
      prefill: {
        name: details.fullname,
        email: details.email,
        contact: details.mobile,
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
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
        <Button
          variant="contained"
          sx={[
            minorButton,
            {
              "&:disabled": { backgroundColor: "grey" },
              marginY: 3,
            },
          ]}
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
          sx={{ fontWeight: "bold", color: "red", textAlign: "center" }}
        >
          {uploadMsg}
        </Typography>
        {list.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: "#0a423a" }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                    align="center"
                  >
                    Upload Item
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                    align="center"
                  >
                    Date of Upload
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                    align="center"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: major }}>
                {list.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: 2,
                      borderColor: "#0a423a ",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{ color: textColor }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ color: textColor }} align="center">
                      {row.createdAt.substring(0, row.createdAt.indexOf("T"))}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color:
                          row.status === "Pending"
                            ? "orange"
                            : row.status == "Aproved"
                            ? "#0a423a"
                            : "red",
                      }}
                      align="center"
                    >
                      {row.status}
                      {row.status == "Aproved" && (
                        <Button
                          variant="contained"
                          sx={[minorButton, { marginLeft: 3 }]}
                          onClick={() => checkoutHandler(1000)}
                        >
                          Pay
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
    </>
  );
}
