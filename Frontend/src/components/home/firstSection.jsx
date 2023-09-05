import { Box, Button, Fade, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { centerAlign, size, stack } from "../../sx/container";
import { minorButton } from "../../sx/button";
import { minor } from "../../sx/colors";

export default function FirstSection() {
  const naviagte = useNavigate();
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
    <Box sx={[size, centerAlign]}>
      <Grid container sx={{ width: "60%" }}>
        <Grid ref={ref} item xs={12} md={6} sx={[centerAlign, stack]}>
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
                <Box component={"span"} sx={{ color: "#158474" }}>
                  3D
                </Box>
              </Typography>
            </Fade>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Button
                variant="contained"
                sx={[minorButton, { fontSize: { md: 32 } }]}
                onClick={() =>
                  naviagte("/displayModels", { state: { type: "demo" } })
                }
              >
                Get Demo
              </Button>
            </Fade>
          </Box>
          <Box></Box>
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
              sx={{
                width: { md: 500 },
                height: { md: 600 },
                overflow: "hidden",
              }}
            >
              <Box
                component={"img"}
                src="/images/firstSection.jpg"
                sx={{
                  width: "100%",
                  marginTop: 2,
                  objectFit: "contain",
                  boxShadow: 3,
                }}
              ></Box>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
