import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Fade } from "@mui/material";
import { centerAlign, stack } from "../../sx/container";

export default function FirstSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  });
  const ref = useRef(null);
  return (
    <>
      <Grid item ref={ref} xs={12} md={6} sx={[centerAlign, stack]}>
        <Fade
          in={isIntersecting}
          style={{ transitionDelay: isIntersecting ? "500ms" : "0ms" }}
        >
          <Typography
            sx={{
              fontSize: { xs: 48, md: 48 },
              fontWeight: "bold",
              color: "#158474",
            }}
          >
            About Us
          </Typography>
        </Fade>

        <Fade
          in={isIntersecting}
          style={{ transitionDelay: isIntersecting ? "500ms" : "0ms" }}
        >
          <Typography
            component="p"
            sx={{
              width: { xs: "90%", md: "60%" },
              textAlign: "justify",
              fontSize: { xs: 24, md: 36 },
            }}
          >
            Welcome to ArtVista, your gateway to a captive world of art and
            history. Our platform is dedicated to bringing the rich heritage of
            sculptures and paintings to life through cutting-edge technology and
            insightfyl storytelling.
          </Typography>
        </Fade>
      </Grid>
      <Grid item xs={12} md={6} sx={[centerAlign, stack]}>
        <Box
          sx={{
            width: { md: 500 },
            height: { md: 600 },
            overflow: "hidden",
          }}
        >
          <Box
            component={"img"}
            src="/images/about1.jpg"
            sx={{ width: "100%", marginTop: 2, objectFit: "contain" }}
          ></Box>
        </Box>
      </Grid>
    </>
  );
}
