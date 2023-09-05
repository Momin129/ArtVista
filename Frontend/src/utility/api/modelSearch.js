import axios from "axios";

export const searchModel = async (query) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST}/api/models/searchedModel`,
      { params: { searchQuery: query } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
