const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { UserUpload } = require("../../models/userUploadModel");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log("File", file.originalname, "user_id", req.body.user_id);
    return {
      filename: file.originalname,
      bucketName: "uploads", // Name of the MongoDB collection
      metadata: { commonId: req.body.user_id },
    };
  },
});

const upload = multer({ storage });

const uploadImages = async (req, res) => {
  const { user_id, title, info } = req.body;
  console.log(req.files);
  try {
    await UserUpload.create({ user_id, title, info });
    res.status(201).json({ message: "Files uploaded successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getUserUploads = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const userUploads = await UserUpload.find({ user_id: userId });
    res.status(200).json({ userUploads });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = {
  upload,
  getUserUploads,
  uploadImages,
};
