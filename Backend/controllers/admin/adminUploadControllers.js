const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const {
  Monuments,
  Paintings,
  Sculptures,
  Artifacts,
} = require("../../models/storageModel");

const mongoose = require("mongoose");
const { UserUpload } = require("../../models/userUploadModel");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "models",
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "models",
    };
  },
});

const upload = multer({ storage });

const uploadModel = async (req, res) => {
  try {
    const { filename } = req.file;
    const { upload_id, title, info, thumbnail, type } = req.body;

    let Schema;

    if (type == "userUploads") {
      await UserUpload.findOneAndUpdate(
        { _id: upload_id },
        {
          title: title,
          info: info,
          thumbnail: thumbnail,
          filename: filename,
        }
      );
    } else {
      if (type == "painting") Schema = Paintings;
      else if (type == "sculpture") Schema = Sculptures;
      else if (type == "artifact") Schema = Artifacts;
      else if (type == "monuments") Schema = Monuments;
      await Schema.create({
        title: title,
        info: info,
        filename: filename,
        thumbnail: thumbnail,
      });
    }
    res.status(200).json({ message: "Model Uploaded Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getModel = async (req, res) => {
  const filename = req.params.filename;
  const downloadStream = modelBucket.openDownloadStreamByName(filename);

  downloadStream.on("error", (error) => {
    res.status(404).send("File not found");
  });

  downloadStream.pipe(res);
};

const deleteModel = async (req, res) => {
  const id = req.body.id;
  const fileId = new mongoose.Types.ObjectId(id);

  try {
    await bucket.delete(fileId);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = { upload, uploadModel, getModel, deleteModel };
