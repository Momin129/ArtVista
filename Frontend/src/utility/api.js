import axios from "axios";
import { host } from "./host";

export const fetchFavourites = async () => {
  const list = [];
  try {
    const userId = sessionStorage.getItem("userId");
    const favList = await axios.get(`${host}/api/favouritesList`, {
      params: { userId: userId },
    });
    for (let i = 0; i < favList.data.length; i++) {
      const getmodel = await axios.get(`${host}/api/getModel`, {
        params: {
          modelId: favList.data[i].modelId,
          type: favList.data[i].type,
        },
      });
      list.push(getmodel.data.getmodel[0]);
    }
    return list;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchLatestModels = async () => {
  try {
    const latestModel = await axios.get(`${host}/api/home/getLatestModels`);
    return latestModel.data;
  } catch (error) {
    console.log("Error", error);
  }
};
