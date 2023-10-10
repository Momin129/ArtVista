const mongoose = require("mongoose");

let modelBucket, userBucket;
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {
      modelBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "models",
      });
      userBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
    });
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB, modelBucket, userBucket };
