import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GenerateModel from "../components/model";
import PopUp from "../components/user/popUp";
import { centerAlign, size, stack } from "../sx/container";
import { major, minor } from "../sx/colors";

export default function DisplayModels() {
  const { state } = useLocation();
  const { type, searchModel } = state;
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
      const remove = await axios.post(
        `${import.meta.env.VITE_HOST}/api/removeFavourtie`,
        {
          userId,
          modelId,
        }
      );
      setCurrentModel((prev) => ({
        ...prev,
        favourite: remove.data.status,
      }));
    } else {
      const add = await axios.post(
        `${import.meta.env.VITE_HOST}/api/addFavourite`,
        {
          userId,
          modelId,
          type,
        }
      );
      setCurrentModel((prev) => ({
        ...prev,
        favourite: add.data.status,
      }));
    }
  };

  const handleCurrentModel = async (image) => {
    const userId = sessionStorage.getItem("userId");
    const favourites = await axios.get(
      `${import.meta.env.VITE_HOST}/api/favourites`,
      {
        params: { modelId: image._id, userId: userId },
      }
    );
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
        const result = await axios.get(
          `${import.meta.env.VITE_STORAGE_HOST}/api/getModel`,
          {
            params: { type: type },
          }
        );
        setImages(result.data.getmodel);

        const model = searchModel ? searchModel : result.data.getmodel[0];
        const userId = sessionStorage.getItem("userId");
        const favourites = await axios.get(
          `${import.meta.env.VITE_HOST}/api/favourites`,
          {
            params: { modelId: model._id, userId: userId },
          }
        );

        setCurrentModel((prev) => ({
          ...prev,
          _id: model._id,
          title: model.title,
          info: model.info,
          path: model.path,
          favourite: favourites.data.status,
        }));
        if (searchModel) {
          const index = result.data.getmodel.findIndex(
            (item) => item._id === searchModel._id
          );
          setSelectedIndex(index);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [type, searchModel]);
  return (
    <>
      {loading ? (
        <Box
          sx={[
            size,
            centerAlign,
            stack,
            {
              paddingX: { xs: 1, md: 5 },
              paddingY: { xs: 5, md: 0 },
              gap: 3,
            },
          ]}
        >
          <CircularProgress sx={{ color: minor }} />
        </Box>
      ) : images.length > 0 ? (
        <Box
          sx={[
            size,
            centerAlign,
            stack,
            {
              paddingX: { xs: 1, md: 5 },
              paddingY: { xs: 5, md: 0 },
              gap: 3,
            },
          ]}
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
              scrollbarColor: `${minor} ${major}`,
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
                  border: selectedIndex == index ? 4 : 0,
                  borderColor: minor,
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
              borderColor: minor,
              width: { xs: "90%", md: "30%" },
              height: { xs: "60%", md: "50%" },
              overflow: "hidden",
              boxShadow: "8px 8px 8px #0a423a",
            }}
          >
            {currentModel.path != "" && (
              <GenerateModel currentModel={currentModel.path} />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InfoIcon
              onClick={handleOpen}
              sx={{ color: "#0a423a", fontSize: 36 }}
            />
            {currentModel.favourite ? (
              <FavoriteIcon
                sx={{ color: "#0a423a", fontSize: 36 }}
                onClick={hadleFavourite}
              ></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon
                sx={{ color: "#0a423a", fontSize: 36 }}
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
          sx={[
            size,
            centerAlign,
            stack,
            {
              paddingX: { xs: 1, md: 5 },
              paddingY: { xs: 5, md: 0 },
              gap: 3,
            },
          ]}
        >
          <Typography sx={{ fontSize: { xs: 36, md: 64 } }}>
            No Data Present
          </Typography>
        </Box>
      )}
    </>
  );
}
