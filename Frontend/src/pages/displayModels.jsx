import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { StorageHost, host } from "../utility/host";
import GenerateModel from "../components/model";
import PopUp from "../components/user/popUp";

export default function DisplayModels() {
  const { state } = useLocation();
  const { type } = state;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentModel, setCurrentModel] = useState({
    _id: "",
    title: "",
    info: "",
    path: "",
    favourite: false,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hadleFavourite = async () => {
    const userId = sessionStorage.getItem("userId");
    const modelId = currentModel._id;
    if (currentModel.favourite) {
      const remove = await axios.post(`${host}/api/removeFavourtie`, {
        userId,
        modelId,
      });
      setCurrentModel((prev) => ({
        ...prev,
        favourite: remove.data.status,
      }));
    } else {
      const add = await axios.post(`${host}/api/addFavourite`, {
        userId,
        modelId,
        type,
      });
      setCurrentModel((prev) => ({
        ...prev,
        favourite: add.data.status,
      }));
    }
  };

  const handleCurrentModel = async (image) => {
    const userId = sessionStorage.getItem("userId");
    const favourites = await axios.get(`${host}/api/favourites`, {
      params: { modelId: image._id, userId: userId },
    });
    setCurrentModel((prev) => ({
      ...prev,
      _id: image._id,
      title: image.title,
      info: image.info,
      path: image.path,
      favourite: favourites.data.status,
    }));
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await axios.get(`${StorageHost}/api/getModel`, {
          params: { type: type },
        });
        setImages(result.data.getmodel);

        const model = result.data.getmodel[0];
        const userId = sessionStorage.getItem("userId");
        const favourites = await axios.get(`${host}/api/favourites`, {
          params: { modelId: model._id, userId: userId },
        });

        setCurrentModel((prev) => ({
          ...prev,
          _id: model._id,
          title: model.title,
          info: model.info,
          path: model.path,
          favourite: favourites.data.status,
        }));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [type]);
  return (
    <>
      {loading ? (
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
          <CircularProgress sx={{ color: "#2fdfc6" }} />
        </Box>
      ) : images.length > 0 ? (
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
                sx={{
                  width: 250,
                  height: { xs: 300, md: 250 },
                  marginLeft: { xs: 2, md: 3 },
                  border: selectedIndex == index ? 2 : 0,
                  borderColor: "#2fdfc6",
                }}
                onClick={() => {
                  handleCurrentModel(image);
                  setSelectedIndex(index);
                }}
              ></Box>
            ))}
          </Box>
          <Box
            sx={{
              border: 3,
              borderRadius: 3,
              borderColor: "#2fdfc6",
              width: { xs: "90%", md: "30%" },
              height: { xs: "60%", md: "50%" },
              overflow: "hidden",
            }}
          >
            {currentModel.path != "" && (
              <GenerateModel currentModel={currentModel.path} />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InfoIcon
              onClick={handleOpen}
              sx={{ color: "#2fdfc6", fontSize: 36 }}
            />
            {currentModel.favourite ? (
              <FavoriteIcon
                sx={{ color: "#2fdfc6", fontSize: 36 }}
                onClick={hadleFavourite}
              ></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon
                sx={{ color: "#2fdfc6", fontSize: 36 }}
                onClick={hadleFavourite}
              />
            )}
          </Box>
          <PopUp
            open={open}
            handleClose={handleClose}
            currentModel={currentModel}
          />
        </Box>
      ) : (
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
          <Typography sx={{ fontSize: { xs: 36, md: 64 } }}>
            No Data Present
          </Typography>
        </Box>
      )}
    </>
  );
}
