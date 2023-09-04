import axios from "axios";
import { StorageHost, host } from "./host";

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

export const fetchUserUploads = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const userUploads = await axios.get(`${StorageHost}/api/userUploads`, {
      params: { userId: userId },
    });
    console.log(userUploads);
    return userUploads.data.userUploads;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUploadRequests = async () => {
  try {
    const requestList = await axios.get(`${host}/api/admin/uploadRequest`);
    for (let item = 0; item < requestList.data.length; item++) {
      const email = await axios.get(`${host}/api/admin/uploadEmail`, {
        params: { userId: requestList.data[item].userId },
      });
      requestList.data[item].email = email.data;
    }
    return requestList.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAproveRequest = async (id) => {
  try {
    const response = await axios.post(`${host}/api/admin/aproveRequest`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRejectRequest = async (id, filename) => {
  console.log(id);
  try {
    const response = await axios.post(`${StorageHost}/api/rejectRequest`, {
      id: id,
      filename: filename,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserUpload = async (id) => {
  try {
    const response = await axios.get(`${StorageHost}/api/deleteUserUploads`, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(`${host}/api/admin/getFeedbacks`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
