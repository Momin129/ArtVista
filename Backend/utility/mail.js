const nodemailer = require("nodemailer");
const Contact = require("../models/contactModel");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

const SendMail = (mailOptions, OTP, res) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({ message: "Something went wrong." });
    } else {
      res.status(200).json(OTP);
    }
  });
};

const SendReply = (mailOptions, id, res) => {
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong." });
    } else {
      console.log(info);
      await Contact.deleteOne({ _id: id });
      res.status(200).json(true);
    }
  });
};

module.exports = { SendMail, SendReply };
