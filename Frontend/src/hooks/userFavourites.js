import { useQuery } from "react-query";
import axios from "axios";

const fetchFavourites = () => {
  const userId = sessionStorage.getItem("userId");
  const data = axios.get(`${import.meta.env.VITE_HOST}/api/getAllFavourites`, {
    params: {
      userId: userId,
    },
  });
  return data;
};

export const UserFavourites = (currentModel, onFavSucess) => {
  return useQuery(["getFavourites"], fetchFavourites, {
    enabled: !!currentModel._id,
    select: (data) => data.data,
    onSuccess: (data) => onFavSucess(data, currentModel),
    refetchOnWindowFocus: false,
  });
};
