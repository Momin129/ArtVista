import axios from "axios";
import { host } from "../host";

export const sendReply = async (feeback, reply) => {
  try {
    const response = await axios.post(`${host}/api/admin/sendReply`, {
      id: feeback._id,
      email: feeback.email,
      reply: reply,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
