import axios from "axios";
import { host } from "../host";

export const getUserDetails = async () => {
  try {
    const result = await axios.get(`${host}/api/user/getUserDetails`, {
      params: { userId: sessionStorage.getItem("userId") },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
