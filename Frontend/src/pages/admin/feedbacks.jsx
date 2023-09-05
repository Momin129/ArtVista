import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeedbacks } from "../../utility/api";
import FeedbackTable from "../../components/adminDashboard/feedback/feedbackTable";
import { centerAlign, size } from "../../sx/container";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getFeedbacks();
      setFeedbacks(response);
    })();
  }, []);
  return (
    <Box sx={[size, centerAlign]}>
      <FeedbackTable list={feedbacks} />
    </Box>
  );
}
