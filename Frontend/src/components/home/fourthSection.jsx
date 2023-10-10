import { Box, Grid, Fade, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { fetchLatestModels } from "../../utility/api";
import { centerAlign, size } from "../../sx/container";

export default function FourthSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    (async () => {
      const model = await fetchLatestModels();
      setLatest(model);
    })();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "50px", threshold: 0 }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  });

  const ref = useRef(null);
  return (
    <Box sx={[size, centerAlign]}>
      <Grid
        ref={ref}
        container
        sx={{
          width: "80%",
        }}
        spacing={{ xs: 2, md: 0 }}
      >
        <Grid item xs={12}>
          <Box>
            <Fade
              in={isIntersecting}
              style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginY: 10,
                }}
              >
                Our latest additions
              </Typography>
            </Fade>
          </Box>
        </Grid>
        {latest &&
          latest.map((item, index) => (
            <Grid key={index} item xs={12} md={4} sx={[centerAlign]}>
              <Box>
                <Fade
                  in={isIntersecting}
                  style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
                >
                  <Box
                    sx={{
                      width: { md: 400 },
                      height: { md: 400 },
                    }}
                  >
                    <Box
                      component={"img"}
                      src={item != null ? item.thumbnail : "/demo/demo1.jpg"}
                      sx={{ width: 1, height: 1, objectFit: "fill" }}
                    ></Box>
                  </Box>
                </Fade>
                <Typography
                  sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
