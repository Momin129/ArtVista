const mongoose = require("mongoose");
const {
  Paintings,
  Sculptures,
  Artifacts,
  Monuments,
} = require("../../models/storageModel");

const { UserUpload } = require("../../models/userUploadModel");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "models",
  });
});

const getModelList = async (req, res) => {
  const type = req.query.type;
  let Schema;
  if (type == "painting") Schema = Paintings;
  else if (type == "sculpture") Schema = Sculptures;
  else if (type == "artifact") Schema = Artifacts;
  else if (type == "monument") Schema = Monuments;
  else Schema = UserUpload;

  let getmodel;

  try {
    if (type == "user") {
      getmodel = await Schema.find({ status: "Payed" });
    } else {
      getmodel = await Schema.find();
    }
    res.status(200).json({ getmodel });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const getModel = async (req, res) => {
  const filename = req.params.filename;
  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on("error", (error) => {
    res.status(404).send("File not found");
  });

  downloadStream.pipe(res);
};

module.exports = { getModelList, getModel };
