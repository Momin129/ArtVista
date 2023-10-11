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

export const downloadZip = async (commonId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST}/api/admin/downloadZip`,
      {
        params: { commonId: commonId },
        responseType: "blob",
      }
    );
    // Create a link to download the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${commonId}.zip`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};
