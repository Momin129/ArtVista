const mongoose = require("mongoose");
const { UserUpload } = require("../../models/userUploadModel");
const archiver = require("archiver");
const zlib = require("zlib");
const fs = require("fs");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

const downloadZip = async (req, res) => {
  const commonId = req.query.commonId;

  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const files = await bucket
      .find({ "metadata.commonId": commonId })
      .toArray();
    const zipFilename = "modelImages.zip";
    const output = fs.createWriteStream(zipFilename);
    const archive = archiver("zip");

    output.on("close", () => {
      console.log("Zip file created successfully");
      res.download(zipFilename, "modelImages.zip", (err) => {
        if (err) console.log(err);
        else {
          console.log("Zip file sent successfully.");
          fs.unlinkSync(zipFilename);
        }
      });
    });
    archive.pipe(output);

    for (const file of files) {
      const readStream = bucket.openDownloadStream(file._id);
      const gzip = zlib.createGzip();

      archive.append(readStream.pipe(gzip), { name: file.filename });
    }

    archive.finalize();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUserUploads = async (req, res) => {
  const upload_id = req.params.upload_id;
  try {
    const record = await UserUpload.findById(upload_id);
    if (record) {
      const filesToDelete = await bucket
        .find({
          "metadata.commonId": "64d9b143beb112f5c3c02ddf",
        })
        .toArray();

      for (const file of filesToDelete) {
        await bucket.delete(file._id);
      }
      await UserUpload.deleteOne({ _id: upload_id });
      res.status(200).json({ message: "Files deleted successfully." });
    } else res.status(400).json({ message: "No such record" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong while deleting user upload images.",
    });
  }
};

module.exports = { deleteUserUploads, downloadZip };
