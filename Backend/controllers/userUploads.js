const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { UserUpload } = require("../models/userUploadModel");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads", // Name of the MongoDB collection
      metadata: { commonId: req.body.user_id },
    };
  },
});

const upload = multer({ storage });

const getUserUploads = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const userUploads = await UserUpload.find({ userId: userId });
    res.status(200).json({ userUploads });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = { upload, getUserUploads };
