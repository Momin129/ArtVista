import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Fade } from "@mui/material";
import { centerAlign, stack } from "../../sx/container";

export default function FourthSection() {
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
            src="/images/about2.jpg"
            sx={{ width: "100%", marginTop: 2, objectFit: "contain" }}
          ></Box>
        </Box>
      </Grid>
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
            Discover Art in a New Light
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
            With deep appreciation for both tradition and technology, we offere
            a unique way to explore sculptures, paintings and artifacts. Our
            interactive 3D models allow you to view every curve, texture, and
            brushstroke, providing an imtimate connection with each masterpiece.
          </Typography>
        </Fade>
      </Grid>
    </>
  );
}
