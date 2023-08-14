const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const {
  Paintings,
  Sculptures,
  Artifacts,
  Demo,
} = require("../models/fileModel");

let bucket;
const connection = mongoose.createConnection(process.env.MONGO_URI);
connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(connection, {
    bucketName: "models",
  });
});

const addModel = async (req, res) => {
  console.log(bucket);
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = { filename: filename, bucketName: "models" };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

module.exports = { upload };
