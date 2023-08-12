import { Box, Typography, Modal } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/slider.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function DisplayModels() {
  const { state } = useLocation();
  const { type } = state;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const images = [
    {
      url: "/demo/demo1.jpg",
      title: "Title 1",
      content:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis purus sit amet lacus commodo mollis. Etiam eleifend tortor eget porta dapibus. Integer id efficitur purus. Duis sed metus quis nunc rhoncus posuere ac a libero. Vestibulum dapibus volutpat egestas. Aenean suscipit, risus non commodo consectetur, turpis nisl viverra turpis, cursus placerat nisi neque vitae lorem. Integer ut pellentesque neque. Maecenas volutpat eros vitae auctor ullamcorper. In hac habitasse platea dictumst. Proin vel pulvinar orci. Curabitur tincidunt et libero sed pretium. Vestibulum fermentum nulla non velit bibendum, vel malesuada quam cursus. Vivamus molestie sodales elit vitae finibus. Phasellus consectetur odio imperdiet ullamcorper gravida. Phasellus a mattis quam, non eleifend tortor. Mauris risus ex, commodo ac auctor quis, malesuada quis urna. Nulla consectetur turpis eu nisi laoreet venenatis. Ut condimentum, massa ac fermentum consequat, augue dolor placerat leo, vitae auctor turpis justo at augue. Nulla id commodo neque. ",
    },
    {
      url: "/demo/demo2.jpg",
      title: "Title 2",
      content: "This is content of image 2",
    },
    {
      url: "/demo/demo3.jpg",
      title: "Title 3",
      content: "This is content of image 3",
    },
    {
      url: "/demo/demo4.jpg",
      title: "Title 4",
      content: "This is content of image 4",
    },
    {
      url: "/demo/demo5.jpg",
      title: "Title 5",
      content: "This is content of image 5",
    },
    {
      url: "/demo/demo6.jpg",
      title: "Title 6",
      content: "This is content of image 6",
    },
    {
      url: "/demo/demo7.jpg",
      title: "Title 7",
      content: "This is content of image 7",
    },
    {
      url: "/demo/demo8.jpg",
      title: "Title 8",
      content: "This is content of image 8",
    },
  ];
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#050215",
          color: "white",
          height: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingX: { xs: 1, md: 5 },
          paddingY: { xs: 5, md: 0 },
          gap: 3,
        }}
      >
        <Typography variant="h2">{type.toUpperCase()}</Typography>
        <Carousel
          infinite={true}
          containerClass="carousel-container"
          responsive={responsive}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 300, md: 200 },
                height: { xs: 300, md: 200 },
                borderRadius: 2,
                overflow: "hidden",
                margin: "0 auto",
                cursor: "pointer",
              }}
              onClick={() => {
                setIndex(index);
              }}
            >
              <Box
                component={"img"}
                src={image.url}
                sx={{ height: 1, width: 1, objectFit: "fill" }}
              ></Box>
            </Box>
          ))}
        </Carousel>
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "100%", md: "60%" },
            padding: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Box
              component={"img"}
              src={`/demo/demo${index + 1}.jpg`}
              sx={{ width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 } }}
            ></Box>
          </Box>
          <Box sx={{ display: "flex", gap: 5 }}>
            <InfoIcon
              titleAccess="Info"
              sx={{ fontSize: 36, color: "#2dfdc6", cursor: "pointer" }}
              onClick={handleOpen}
            />
            <FavoriteBorderIcon
              titleAccess="Add to favourites"
              sx={{ fontSize: 36, color: "#2dfdc6", cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 400, md: 600 },
              height: { xs: 400, md: 600 },
              backgroundColor: "#050215",
              border: "2px solid #000",
              borderColor: "#2dfdc6",
              color: "white",
              borderRadius: 3,
              p: 4,
              overflowY: "auto",
              textAlign: "justify",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ borderBottom: 1 }}
            >
              {images[index].title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {images[index].content}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
