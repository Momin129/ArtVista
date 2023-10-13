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
    filename: { type: String },
    thumbnail: { type: String },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
    payment_id: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserUpload = mongoose.model("UserUpload", userUploadSchema);
module.exports = { UserUpload };
