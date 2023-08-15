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
  let Schema;
  if (req.body.type == "painting") Schema = Paintings;
  else if (req.body.type == "sculpture") Schema = Sculptures;
  else if (req.body.type == "artifact") Schema = Artifacts;
  else Schema = Demo;

  const add = await Schema.create({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    info: req.body.info,
    modelId: req.file.id,
  });

  if (add) res.status(200).json({ message: "Model Uploaded Successfully." });
  else res.status(400).json({ message: "Something went wrong" });
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

module.exports = { upload, addModel };
