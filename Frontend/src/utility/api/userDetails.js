import axios from "axios";

export const getUserDetails = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_HOST}/api/user/getUserDetails`,
      {
        params: { userId: sessionStorage.getItem("userId") },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
