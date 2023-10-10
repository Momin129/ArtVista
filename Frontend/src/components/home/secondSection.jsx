import { Box, Grid, Fade, Typography, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { centerAlign, size, stack } from "../../sx/container";
import { minorButton } from "../../sx/button";

export default function SecondSection() {
  const navigate = useNavigate();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev < 4) return prev + 1;
        else return 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const ref = useRef(null);
  return (
    <Box sx={[size, centerAlign]}>
      <Grid container sx={{ width: "80%" }}>
        <Grid item xs={12} md={6} sx={[centerAlign, stack]}>
          <Box ref={ref}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Box
                sx={{
                  width: { md: 500 },
                  height: { md: 600 },
                  overflow: "hidden",
                }}
              >
                <Box
                  component={"img"}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={`/images/home/${currentImage}.jpg`}
                ></Box>
              </Box>
            </Fade>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={[centerAlign]}>
          <Box ref={ref}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 30, md: 86 },
                    fontWeight: "bold",
                    lineHeight: 0.95,
                  }}
                >
                  Welcome to
                  <Box component={"span"} sx={{ color: "#158474" }}>
                    ArtVista
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ width: { md: "70%" }, textAlign: "justify" }}
                >
                  Welcome to our digital haven of artistic marvels! At ArtVista,
                  We invite you to embark on a captivating journer through
                  history and creativity. Immerse yourself in the world of
                  exquisite sculptures, paintings and many more, where each
                  element comes to life in stunning 3D detail. Our platform is a
                  tribute to the timeless beauty of art, meticulously curated
                  with informative insights that breathe life into every
                  masterpiece. Join us in exploring the past, present, and
                  future of artistic expression, as we bridge the gap between
                  tradition and technology.
                </Typography>
                <Button
                  variant="contained"
                  sx={[minorButton, { marginTop: 2 }]}
                  onClick={() => navigate("/about")}
                >
                  About Us
                </Button>
              </Box>
            </Fade>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
