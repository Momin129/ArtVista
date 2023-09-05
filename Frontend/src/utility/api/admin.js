import axios from "axios";

export const sendReply = async (feeback, reply) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HOST}/api/admin/sendReply`,
      {
        id: feeback._id,
        email: feeback.email,
        reply: reply,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
