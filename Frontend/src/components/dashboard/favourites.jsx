import { Box, Grid, Typography } from "@mui/material";
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
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: 48, md: 64 },
          fontWeight: "bold",
        }}
      >
        Favourites
      </Typography>
      <Box
        sx={{
          padding: 1,
          height: 1,
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {images.length == 0 ? (
          <Typography variant="h3">NO FAVOURITES</Typography>
        ) : (
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid
                key={index}
                item
                lg={4}
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: 400, height: 400 }}>
                  <Box
                    component="img"
                    src={image.url}
                    sx={{ width: 1, height: 1, objectFit: "contain" }}
                  ></Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
