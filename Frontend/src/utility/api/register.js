import axios from "axios";
import { host } from "../host";

export const setOTP = async (email) => {
  try {
    const response = await axios.post(`${host}/api/user/sendOTP`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
