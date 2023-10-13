import axios from "axios";

export const fetchFavourites = async () => {
  const list = [];
  try {
    const userId = sessionStorage.getItem("userId");
    const favList = await axios.get(
      `${import.meta.env.VITE_HOST}/api/favouritesList`,
      {
        params: { userId: userId },
      }
    );
    for (let i = 0; i < favList.data.length; i++) {
      const getmodel = await axios.get(
        `${import.meta.env.VITE_HOST}/api/getModel`,
        {
          params: {
            modelId: favList.data[i].modelId,
            type: favList.data[i].type,
          },
        }
      );
      list.push(getmodel.data.getmodel[0]);
    }
    return list;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchLatestModels = async () => {
  try {
    const latestModel = await axios.get(
      `${import.meta.env.VITE_HOST}/api/home/getLatestModels`
    );
    return latestModel.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchUserUploads = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const userUploads = await axios.get(
      `${import.meta.env.VITE_HOST}/api/userUploads`,
      {
        params: { userId: userId },
      }
    );
    return userUploads.data.userUploads;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUploadRequests = async () => {
  try {
    const requestList = await axios.get(
      `${import.meta.env.VITE_HOST}/api/admin/uploadRequest`
    );
    for (let item = 0; item < requestList.data.length; item++) {
      const email = await axios.get(
        `${import.meta.env.VITE_HOST}/api/admin/uploadEmail`,
        {
          params: { userId: requestList.data[item].user_id },
        }
      );
      requestList.data[item].email = email.data;
    }
    return requestList.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAproveRequest = async (id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST}/api/admin/aproveRequest`,
      {
        id: id,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRejectRequest = async (id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST}/api/admin/rejectRequest`,
      {
        upload_id: id,
      }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserUpload = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_STORAGE_HOST}/api/deleteUserUploads`,
      {
        params: { id: id },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST}/api/admin/getFeedbacks`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
