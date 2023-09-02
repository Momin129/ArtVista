const {
  Paintings,
  Sculptures,
  Artifacts,
  Demo,
} = require("../models/storageModel");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const { UserUpload } = require("../models/userUploadModel");
const fs = require("fs");
const mongoose = require("mongoose");
const baseUrl = "http://localhost:4242";

const getNumbers = async (req, res) => {
  try {
    const noOfUser = await User.countDocuments();
    const noOfPainting = await Paintings.countDocuments();
    const noOfSculpture = await Sculptures.countDocuments();
    const noOfArtifact = await Artifacts.countDocuments();
    const noOfDemo = await Demo.countDocuments();
    const noOfContact = await Contact.countDocuments();

    res.status(200).json({
      records: [
        { name: "Users", count: noOfUser },
        { name: "Paintings", count: noOfPainting },
        { name: "Sculptures", count: noOfSculpture },
        { name: "Artifacts", count: noOfArtifact },
        { name: "Demo", count: noOfDemo },
        { name: "Contact", count: noOfContact },
      ],
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllDetails = async (req, res) => {
  try {
    const type = req.query.type;
    let Schema;
    if (type == "painting") Schema = Paintings;
    else if (type == "sculpture") Schema = Sculptures;
    else if (type == "artifact") Schema = Artifacts;
    else if (type == "user") Schema = User;
    else if (type == "contact") Schema = Contact;
    else Schema = Demo;

    const data = await Schema.find();
    res.status(200).json(data);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

const getUploadRequest = async (req, res) => {
  try {
    const requestList = await UserUpload.find({ status: "Pending" });
    res.status(200).json(requestList);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const aproveRequest = async (req, res) => {
  const id = req.body.id;
  try {
    await UserUpload.findByIdAndUpdate(id, {
      status: "Aproved",
    });
    res.status(200).json(true);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getUploadEmail = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const user = await User.findById(userId);
    res.status(200).json(user.email);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getNumbers,
  getAllDetails,
  getUploadRequest,
  getUploadEmail,
  aproveRequest,
};