import { Box, Button, Grid, Typography } from "@mui/material";
import { centerAlign, size, stack } from "../sx/container";
import { useState } from "react";
import Information from "../components/showModel/Information";
import Model from "../components/showModel/Model";
import { useLocation } from "react-router-dom";
import { TypesOfModel } from "../hooks/typeOfModels";
import { UserFavourites } from "../hooks/userFavourites";

export default function ShowModels() {
  const { state } = useLocation();
  const { type, searchModel } = state;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState([]);

  const onSuccess = (data) => {
    if (searchModel) {
      const index = data.findIndex((item) => item._id === searchModel._id);
      setSelectedIndex(index);
      setCurrentModel(data[index]);
    } else {
      setSelectedIndex(0);
      setCurrentModel(data[0]);
    }
  };
  const onFavSuccess = (data, currentModel) => {
    if (data.includes(currentModel._id))
      setCurrentModel({ ...currentModel, favourite: true });
    else
      setCurrentModel({
        ...currentModel,
        favourite: false,
      });
  };

  const { data, isLoading } = TypesOfModel(type, onSuccess);
  const { data: favourites, isLoading: isFavLoading } = UserFavourites(
    currentModel,
    onFavSuccess
  );

  if (isLoading && isFavLoading)
    return (
      <Box sx={[size, centerAlign]}>
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <>
      {data ? (
        <Box sx={[size]}>
          <Grid container sx={{ height: 1 }}>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                overflowY: "auto",
                height: 1,
                scrollbarWidth: "thin",
                paddingY: 2,
              }}
            >
              <Box sx={[centerAlign, stack]}>
                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Models
                </Typography>
                {data.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 300,
                      height: 300,
                      overflow: "hidden",
                      border: selectedIndex == index ? 4 : 0,
                      borderColor: "#2fdfc6",
                      marginTop: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.thumbnail}
                      sx={{
                        width: 1,
                        height: 1,
                        objectFit: "fill",
                      }}
                      onClick={() => {
                        setSelectedIndex(index);
                        const model = data[index];

                        if (favourites.includes(data[index]._id))
                          model.favourite = true;
                        else model.favourite = false;

                        setCurrentModel(model);
                      }}
                    ></Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                borderLeft: "2px solid #2fdfc6",
                borderRight: "2px solid #2fdfc6",
                padding: 2,
              }}
            >
              <Box component="span">
                {currentModel.path && <Model currentModel={currentModel} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={[centerAlign, stack]}>
              <Information currentModel={currentModel} />
              <Box>
                {currentModel.favourite ? (
                  <Button variant="contained">Remove From Favourites</Button>
                ) : (
                  <Button variant="contained">Add To Favourite</Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={[size, centerAlign]}>
          <Typography>Loading...</Typography>
        </Box>
      )}
    </>
  );
}
