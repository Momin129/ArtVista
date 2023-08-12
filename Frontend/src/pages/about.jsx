import { Box, Grid, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        height: "auto",
        backgroundColor: "#050215",
        color: "white",
        paddingY: 15,
        gap: 5,
      }}
    >
      <Grid container>
        <Grid
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
          <Typography sx={{ fontSize: { xs: 48, md: 78 }, fontWeight: "bold" }}>
            About Us
          </Typography>
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
        </Grid>

        <Grid
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
          <Box
            component={"img"}
            src="/images/about1.jpg"
            sx={{ width: { xs: 350, md: 500 } }}
          ></Box>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingY: 5 }}>
        <Grid
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
          <Box
            component={"img"}
            src="/images/about2.jpg"
            sx={{ width: { xs: 350, md: 500 } }}
          ></Box>
        </Grid>

        <Grid
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
          <Typography sx={{ fontSize: { xs: 48, md: 78 }, fontWeight: "bold" }}>
            Our Mission
          </Typography>
          <Typography
            component="p"
            sx={{
              width: { xs: "90%", md: "60%" },
              textAlign: "justify",
              fontSize: { xs: 24, md: 36 },
            }}
          >
            At ArtVista, our mission is to bridge the gap between the past and
            the present by showcasing exquisite artifacts in stunning 3D detail.
            We strive to create an immersive and educational experience that
            connects art enthusiasts, history aficionados, and curious minds
            from around the world.
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
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
          <Typography sx={{ fontSize: { xs: 48, md: 78 }, fontWeight: "bold" }}>
            Our Vision
          </Typography>
          <Typography
            component="p"
            sx={{
              width: { xs: "90%", md: "60%" },
              textAlign: "justify",
              fontSize: { xs: 24, md: 36 },
            }}
          >
            We envision a world where art {"isn't"} confined to museums and
            galleries but is accessible to everyone, anytime, anywhere. By
            leveraging the power of digital innovation, we aim to preserve the
            beauty and culture significance of art for generations to come.
          </Typography>
        </Grid>

        <Grid
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
          <Box
            component={"img"}
            src="/images/about3.jpg"
            sx={{ width: { xs: 350, md: 500 } }}
          ></Box>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingY: 5 }}>
        <Grid
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
          <Box
            component={"img"}
            src="/images/about4.jpg"
            sx={{ width: { xs: 350, md: 500 } }}
          ></Box>
        </Grid>

        <Grid
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
          <Typography
            sx={{
              fontSize: { xs: 36, md: 78 },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Discover Art in a New Light
          </Typography>
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
        </Grid>
      </Grid>
    </Box>
  );
}
