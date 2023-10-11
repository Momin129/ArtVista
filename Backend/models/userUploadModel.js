const mongoose = require("mongoose");

const userUploadSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);

const UserUpload = mongoose.model("UserUpload", userUploadSchema);
module.exports = { UserUpload };
