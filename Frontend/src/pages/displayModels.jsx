import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { StorageHost } from "../utility/host";
import GenerateModel from "../components/model";

export default function DisplayModels() {
  const { state } = useLocation();
  const { type } = state;
  const [images, setImages] = useState([]);
  const [currentModel, setCurrentModel] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${StorageHost}/api/getModel`, {
          params: { type: type },
        });
        setImages(result.data.getmodel);
        setCurrentModel(result.data.getmodel[0].path);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [type]);
  console.log("In dispaly model", currentModel);
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
        <Box
          sx={{
            width: "80%",
            height: "auto",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            padding: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "#2fdfc6 #050215",
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image.thumbnail}
              sx={{ width: 250, height: 250, marginLeft: 3 }}
              onClick={() => setCurrentModel(image.path)}
            ></Box>
          ))}
        </Box>
        <Box
          sx={{
            border: 3,
            borderRadius: 3,
            borderColor: "#2fdfc6",
            width: { xs: "90%", md: "40%" },
            height: { xs: "60%", md: "50%" },
            overflow: "hidden",
          }}
        >
          {currentModel.length != 0 && (
            <GenerateModel currentModel={currentModel} />
          )}
        </Box>
      </Box>
    </>
  );
}
