import { Box, Button, Fade, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FirstSection() {
  const naviagte = useNavigate();
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px" },
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  });
  const ref = useRef(null);
  return (
    <Box
      sx={{
        height: { md: "95%" },
        backgroundColor: "#050215",
        color: "white",
        paddingX: { md: 40 },
        paddingY: { xs: 5, md: 20 },
      }}
    >
      <Grid container>
        <Grid
          ref={ref}
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ marginBottom: 3, paddingX: 10 }}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 36, sm: 56, md: 64 },
                  fontWeight: "bold",
                }}
              >
                Where History and Creativity Converges in{" "}
                <Box component={"span"} sx={{ color: "#2dfdc6" }}>
                  3D
                </Box>
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2dfdc6",
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: { md: 36 },
                  fontFamily: "sans-serif",
                  paddingX: { md: 15 },
                  "&:hover": { backgroundColor: "#2dfdc6" },
                }}
                onClick={() => naviagte("/displayModels")}
              >
                Get Demo
              </Button>
            </Fade>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          ref={ref}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Fade
            in={isIntersecting}
            style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
          >
            <Box
              component={"img"}
              src="/images/firstSection.jpg"
              sx={{ width: { xs: 350, md: 500 }, marginTop: 2 }}
            ></Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
