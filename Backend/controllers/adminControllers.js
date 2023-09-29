const { Paintings, Sculptures, Artifacts } = require("../models/storageModel");

const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const { UserUpload } = require("../models/userUploadModel");
const fs = require("fs");
const mongoose = require("mongoose");
const { SendReply } = require("../utility/mail");
const baseUrl = "http://localhost:4242";

const getNumbers = async (req, res) => {
  try {
    const noOfUser = await User.countDocuments();
    const noOfPainting = await Paintings.countDocuments();
    const noOfSculpture = await Sculptures.countDocuments();
    const noOfArtifact = await Artifacts.countDocuments();
    const noOfContact = await Contact.countDocuments();
    const noOfUserUpload = await UserUpload.countDocuments();

    res.status(200).json({
      records: [
        { name: "Users", count: noOfUser, type: "user" },
        { name: "Paintings", count: noOfPainting, type: "painting" },
        { name: "Sculptures", count: noOfSculpture, type: "sculpture" },
        { name: "Artifacts", count: noOfArtifact, type: "artifact" },
        { name: "Feedbacks", count: noOfContact, type: "contact" },
        { name: "User Uploads", count: noOfUserUpload, type: "userUploads" },
      ],
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const Feedbacks = await Contact.find({ reply: false });
    res.status(200).json(Feedbacks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const sendReply = async (req, res) => {
  const { id, email, reply } = req.body;
  try {
    const options = {
      from: email,
      to: process.env.MAIL,
      subject: "Response from ArtVista",
      html: `<p>${reply}</p>`,
    };
    SendReply(options, id, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
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
    else Schema = UserUpload;

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
  getFeedbacks,
  sendReply,
};
