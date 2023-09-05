import { Box, Grid } from "@mui/material";
import FirstSection from "../../components/about/firstSection";
import SecondSection from "../../components/about/secondSection";
import ThirdSection from "../../components/about/thirdSection";
import FourthSection from "../../components/about/fourthSection";
import { major, textColor } from "../../sx/colors";

export default function About() {
  return (
    <Box
      sx={{
        height: "auto",
        backgroundColor: major,
        color: textColor,
        paddingY: 15,
        gap: 5,
      }}
    >
      <Grid container sx={{ height: 1, paddingY: 5 }}>
        <FirstSection />
      </Grid>
      <Grid container sx={{ height: 1, paddingY: 5, marginTop: 10 }}>
        <SecondSection />
      </Grid>
      <Grid container sx={{ height: 1, paddingY: 5, marginTop: 10 }}>
        <ThirdSection />
      </Grid>
      <Grid container sx={{ height: 1, paddingY: 5, marginTop: 10 }}>
        <FourthSection />
      </Grid>
    </Box>
  );
}
