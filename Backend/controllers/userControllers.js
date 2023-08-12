const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// chekc if email and mobile number already exists or not
const emailMobileExists = async (req, res) => {
  const email = req.body.email;
  const mobile = req.body.mobile;

  if (email) {
    const emailExists = await User.findOne({ email });
    console.log(emailExists);
    if (emailExists) res.status(400).json({ message: "Email aready exists." });
    else res.status(200).json({ message: "" });
  }
  if (mobile) {
    const emailExists = await User.findOne({ mobile });
    if (emailExists) res.status(400).json({ message: "Number aready exists." });
    else res.status(200).json({ message: "" });
  }
};

// register a new user
const register = async (req, res) => {
  const { fullname, email, mobile, password } = req.body;

  if (!fullname || !email || !mobile || !password)
    res.status(400).json({ message: "Please provide all fields." });

  // password encryption
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({
    fullname,
    email,
    mobile,
    password: hashedPassword,
  });

  if (user) res.status(200).json({ message: "Registration Successfull." });
  else
    res
      .status(400)
      .json({ message: "Some error occured please try again later." });
};

// to login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (!isUser) res.status(400).json({ message: "Invalid email." });
  else {
    const isValid = await bcryptjs.compare(password, isUser.password);
    if (isValid) {
      res.status(200).json({
        id: isUser._id,
        token: generateToken(isUser._id),
      });
    } else res.status(400).json({ message: "Incorrect password" });
  }
};

const getUserDetails = async (req, res) => {
  const userId = req.query.userId;
  const user = await User.findById(userId);
  if (user)
    res.status(200).json({
      fullname: user.fullname,
      mobile: user.mobile,
      email: user.email,
    });
  else res.status(400).json({ message: "Something went wrong." });
};

// verify if user is loged in or not
const verifyUser = async (req, res) => {
  const token = req.body.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decode);
};

// to generate a login token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};
module.exports = {
  register,
  emailMobileExists,
  login,
  verifyUser,
  getUserDetails,
};
