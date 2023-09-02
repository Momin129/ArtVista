import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeedbacks } from "../../utility/api";
import FeedbackTable from "../../components/adminDashboard/feedback/feedbackTable";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getFeedbacks();
      setFeedbacks(response);
    })();
  }, []);
  return (
    <Box
      sx={{
        height: 1,
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FeedbackTable list={feedbacks} />
    </Box>
  );
}
