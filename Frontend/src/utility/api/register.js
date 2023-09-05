import axios from "axios";

export const setOTP = async (email) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST}/api/user/sendOTP`,
      {
        email: email,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
