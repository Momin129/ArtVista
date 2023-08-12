import { Box, Grid, Fade, Typography, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SecondSection() {
  const navigate = useNavigate();
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
    <Box
      sx={{
        height: { xs: "auto", md: "100%" },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container sx={{ width: "80%" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box ref={ref}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Box
                component={"img"}
                sx={{ width: { xs: 350, md: 600 } }}
                src="/images/secondSection.jpg"
              ></Box>
            </Fade>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box ref={ref}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: { xs: 30, md: 86 }, fontWeight: "bold" }}
                >
                  Welcome to
                  <Box component={"span"} sx={{ color: "#2dfdc6" }}>
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
                  sx={{
                    backgroundColor: "#2dfdc6",
                    color: "black",
                    fontWeight: "bold",
                    marginTop: 2,
                    "&:hover": { backgroundColor: "#2dfdc6" },
                  }}
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
