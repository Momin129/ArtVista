import { Box, Button, Grid, Typography } from "@mui/material";
const images = [
  {
    url: "/demo/demo1.jpg",
    title: "Title 1",
  },
  {
    url: "/demo/demo2.jpg",
    title: "Title 2",
  },
  {
    url: "/demo/demo3.jpg",
    title: "Title 3",
  },
  {
    url: "/demo/demo4.jpg",
    title: "Title 4",
  },
  {
    url: "/demo/demo5.jpg",
    title: "Title 5",
  },
  {
    url: "/demo/demo6.jpg",
    title: "Title 6",
  },
  {
    url: "/demo/demo7.jpg",
    title: "Title 7",
  },
  {
    url: "/demo/demo8.jpg",
    title: "Title 8",
  },
];
export default function Favourites() {
  return (
    <Box
      sx={{ padding: 1, height: 1, overflowY: "auto", scrollbarWidth: "thin" }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
        }}
      >
        Favourites
      </Typography>
      {images.length == 0 ? (
        <Typography variant="h3">NO FAVOURITES</Typography>
      ) : (
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item key={index} xs={12} sm={6} lg={4}>
              <Box
                sx={{
                  width: { xs: 250, md: 350 },
                  height: { xs: 250, md: 350 },
                  overflow: "hidden",
                  backgroundColor: "#2dfdc6",
                  padding: 1,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <Box
                  component={"img"}
                  src={image.url}
                  sx={{
                    width: 1,
                    height: 1,
                    objectFit: "fill",
                  }}
                ></Box>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "#2dfdc6",
                  color: "black",
                  width: { xs: 250, md: 350 },
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingY: 1,
                }}
              >
                {image.title}
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    margin: "0 auto",
                    backgroundColor: "#050215",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#050215" },
                  }}
                >
                  View
                </Button>
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
