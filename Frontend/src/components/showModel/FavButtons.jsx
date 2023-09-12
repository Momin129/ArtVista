/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { minorButton } from "../../sx/button";
import {
  useAddToFavaourites,
  useRemoveFromFavourites,
} from "../../hooks/addRemoveFavourites";

export default function FavButtons({ currentModel, setCurrentModel, type }) {
  const { mutate: addFavourite } = useAddToFavaourites(
    currentModel,
    setCurrentModel
  );

  const { mutate: removeFavourite } = useRemoveFromFavourites(
    currentModel,
    setCurrentModel
  );

  const handleAddFavourite = () => {
    const userId = sessionStorage.getItem("userId");
    const modelId = currentModel._id;
    const modelType = type;
    const obj = { userId: userId, modelId: modelId, type: modelType };
    addFavourite(obj);
  };

  const handleRemoveFavourite = () => {
    const userId = sessionStorage.getItem("userId");
    const modelId = currentModel._id;
    const obj = { userId: userId, modelId: modelId };
    removeFavourite(obj);
  };

  return (
    <>
      {currentModel.favourite ? (
        <Button
          variant="contained"
          sx={[minorButton]}
          onClick={() => handleRemoveFavourite()}
        >
          Remove From Favourites
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={[minorButton]}
          onClick={() => handleAddFavourite()}
        >
          Add To Favourite
        </Button>
      )}
    </>
  );
}
