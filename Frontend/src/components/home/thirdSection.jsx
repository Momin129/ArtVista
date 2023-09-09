import { Box, Grid, Fade, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { centerAlign, size } from "../../sx/container";
import { minor } from "../../sx/colors";

export default function ThirdSection() {
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
    <Box sx={[centerAlign, size]}>
      <Grid
        ref={ref}
        container
        sx={{ width: "80%" }}
        spacing={{ xs: 2, md: 0 }}
      >
        <Grid item xs={12}>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "600ms" : "0ms" }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginY: 10,
                }}
              >
                What we provide
              </Typography>
            </Fade>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={[centerAlign]}>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "600ms" : "0ms" }}
            >
              <Box
                sx={{
                  width: { xs: 350, md: 400 },
                  height: { xs: 350, md: 400 },
                  border: 1,
                  borderRadius: 15,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component={"img"}
                  src="/images/painting.jpg"
                  width={400}
                ></Box>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#158474",
                    fontSize: 48,
                    fontWeight: "bold",
                  }}
                >
                  Paintings
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={[centerAlign]}>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "600ms" : "0ms" }}
            >
              <Box
                sx={{
                  width: { xs: 350, md: 400 },
                  height: { xs: 350, md: 400 },
                  border: 1,
                  borderRadius: 15,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component={"img"}
                  src="/images/sculpture.jpg"
                  width={400}
                ></Box>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: minor,
                    fontSize: 48,
                    fontWeight: "bold",
                  }}
                >
                  Sculptures
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={[centerAlign]}>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "600ms" : "0ms" }}
            >
              <Box
                sx={{
                  width: { xs: 350, md: 400 },
                  height: { xs: 350, md: 400 },
                  border: 1,
                  borderRadius: 15,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component={"img"}
                  src="/images/artifact.png"
                  width={400}
                ></Box>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: minor,
                    fontSize: 48,
                    fontWeight: "bold",
                  }}
                >
                  Artifacts
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
