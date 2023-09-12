import { useMutation } from "react-query";
import axios from "axios";

const addToFavourites = (obj) => {
  return axios.post(`${import.meta.env.VITE_HOST}/api/addFavourite`, obj);
};

const removeFromFavourites = (obj) => {
  return axios.post(`${import.meta.env.VITE_HOST}/api/removeFavourtie`, obj);
};

export const useAddToFavaourites = (currentModel, setCurrentModel) => {
  return useMutation(addToFavourites, {
    onSuccess: () => {
      setCurrentModel({ ...currentModel, favourite: true });
    },
  });
};

export const useRemoveFromFavourites = (currentModel, setCurrentModel) => {
  return useMutation(removeFromFavourites, {
    onSuccess: () => {
      setCurrentModel({ ...currentModel, favourite: false });
    },
  });
};
