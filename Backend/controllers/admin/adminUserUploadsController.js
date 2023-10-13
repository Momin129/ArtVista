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

const updateModel = async (req, res) => {
  const { filename } = req.file;
  const { id, thumbnail } = req.body;
  try {
    await UserUpload.findOneAndUpdate(
      { _id: id },
      { thumbnail: thumbnail, filename: filename }
    );
    res.status(200).json({ message: "Updated Successfully." });
  } catch (error) {
    console.log(error);
    req.status(400).json({ message: "Somethign went wrong." });
  }
};

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

module.exports = { downloadZip, updateModel };
