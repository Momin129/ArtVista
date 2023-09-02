/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import PopUpModel from "../popUpModel";
import axios from "axios";
import { host } from "../../../utility/host";

export default function Favourites({ favourites, setFavourites }) {
  const [currentModel, setCurrentModel] = useState({
    _id: "",
    title: "",
    info: "",
    path: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCurrentModel = async (model, index) => {
    const userId = sessionStorage.getItem("userId");
    const favourite = await axios.get(`${host}/api/favourites`, {
      params: { modelId: model._id, userId: userId },
    });
    setCurrentModel((prev) => ({
      ...prev,
      _id: model._id,
      title: model.title,
      info: model.info,
      path: model.path,
      favourite: favourite.data.status,
      index: index,
    }));
  };

  const handleFavourite = async () => {
    const userId = sessionStorage.getItem("userId");
    const modelId = currentModel._id;
    const remove = await axios.post(`${host}/api/removeFavourtie`, {
      userId,
      modelId,
    });
    if (remove.data.status == false) {
      setFavourites((products) =>
        products.filter((_, index) => index !== currentModel.index)
      );
      handleClose();
    }
  };

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
          padding: 3,
          height: { xs: "100%", md: "80%" },
          width: "100%",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#2fdfc6 #050215",
          borderBottom: 2,
          borderBottomColor: "#2fdfc6",
        }}
      >
        {favourites.length == 0 ? (
          <Typography variant="h3">NO FAVOURITES</Typography>
        ) : (
          <Grid container spacing={2}>
            {favourites.map((model, index) => (
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
                <Box
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#2fdfc6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 1,
                  }}
                >
                  <Box
                    key={index}
                    component="img"
                    src={model.thumbnail}
                    sx={{
                      width: 250,
                      height: { xs: 300, md: 250 },
                    }}
                  ></Box>
                  <Typography
                    sx={{
                      color: "#050215",
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      wordWrap: "break-word",
                      width: 250,
                      height: 30,
                      overflow: "hidden",
                    }}
                  >
                    {model.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#050215",
                      color: "#2fdfc6",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#050215" },
                      width: "100%",
                    }}
                    onClick={() => {
                      handleCurrentModel(model, index);
                      handleOpen();
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        <PopUpModel
          open={open}
          handleClose={handleClose}
          currentModel={currentModel}
          handleFavourite={handleFavourite}
        />
      </Box>
    </>
  );
}
