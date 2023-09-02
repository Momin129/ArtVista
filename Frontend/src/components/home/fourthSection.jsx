import { Box, Grid, Fade, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { fetchLatestModels } from "../../utility/api";

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
    <Box
      sx={{
        height: { md: "100%" },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        ref={ref}
        container
        sx={{
          width: "80%",
          marginTop: { xs: 15, md: 0 },
          marginBottom: { xs: 5, md: 0 },
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
                  marginBottom: 3,
                }}
              >
                Our latest additions
              </Typography>
            </Fade>
          </Box>
        </Grid>
        {latest.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Fade
                in={isIntersecting}
                style={{ transitionDelay: isIntersecting ? "300ms" : "0ms" }}
              >
                <Box
                  sx={{
                    width: { xs: 350, md: 400 },
                    height: { xs: 350, md: 400 },
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    component={"img"}
                    src={item != null ? item.thumbnail : "/demo/demo1.jpg"}
                    width={400}
                  ></Box>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#2dfdc6",
                      fontSize: 48,
                      fontWeight: "bold",
                    }}
                  >
                    {item != null ? item.title : "Title"}
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
