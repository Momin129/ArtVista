import { Box, Button } from "@mui/material";
import { useState } from "react";
const images = [
  { url: "/demo/demo1.jpg" },
  { url: "/demo/demo2.jpg" },
  { url: "/demo/demo3.jpg" },
  { url: "/demo/demo4.jpg" },
  { url: "/demo/demo5.jpg" },
  { url: "/demo/demo6.jpg" },
  { url: "/demo/demo7.jpg" },
  { url: "/demo/demo8.jpg" },
];

export default function SliderComponent() {
  const [list, setList] = useState(images);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 1,
          overflow: "hidden",
          gap: 5,
        }}
      >
        {list.map((image, index) => (
          <Box key={index}>
            <Box
              component={"img"}
              src={image.url}
              sx={{ height: 1, width: 1, objectFit: "contain" }}
            ></Box>
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          const img = images.shift();
          images.push(img);
          setList([...images]);
          console.log(list);
        }}
      >
        Next
      </Button>
    </>
  );
}
