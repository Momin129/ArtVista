const mongoose = require("mongoose");
const Contact = require("../models/contactModel");

const submitContact = async (req, res) => {
  const { fullname, email, comment } = req.body;
  const contact = await Contact.create({ fullname, email, comment });
  if (contact) res.status(200).json({ message: "Submited Successfully" });
  else res.status(400).json({ message: "Something went wrong." });
};

module.exports = { submitContact };
