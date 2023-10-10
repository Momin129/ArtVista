import { Box, Fade, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { centerAlign, size, stack } from "../../sx/container";
import GenerateModel from "../model";
import GenerateRotateModel from "./modelRotate";

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
    <Box sx={[size, centerAlign]}>
      <Grid container sx={{ width: "80%" }}>
        <Grid ref={ref} item xs={12} md={6} sx={[centerAlign, stack]}>
          <Box sx={{ marginY: 3 }}>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 56, md: 86 },
                  fontWeight: "bold",
                  lineHeight: 0.95,
                }}
              >
                Where History and Creativity Converges in{" "}
                <Box component={"span"} sx={{ color: "#158474" }}>
                  3D
                </Box>
              </Typography>
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
                border: "4px solid #2fdfc6",
                borderRadius: 3,
              }}
            >
              <GenerateRotateModel currentModel={"horse.glb"} rotate={true} />
              {/* <Box
                component={"img"}
                sx={{ width: "100%", marginTop: 2, objectFit: "contain" }}
                src="/images/firstSection.jpg"
              ></Box> */}
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
