const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { generateOTP } = require("../../utility/randomOtp");
const { SendMail } = require("../../utility/mail");

// chekc if email and mobile number already exists or not
const emailMobileExists = async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const mobile = req.body.mobile;

  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      if (id && emailExists._id.equals(id))
        res.status(200).json({ message: "" });
      else res.status(400).json({ message: "Email aready exists." });
    } else res.status(200).json({ message: "" });
  }
  if (mobile) {
    const mobileExists = await User.findOne({ mobile });
    if (mobileExists) {
      if (id && mobileExists._id.equals(id))
        res.status(200).json({ message: "" });
      else res.status(400).json({ message: "Number aready exists." });
    } else res.status(200).json({ message: "" });
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
        role: isUser.role,
        token: generateToken(isUser._id, isUser.role),
      });
    } else res.status(400).json({ message: "Incorrect password" });
  }
};

// update details
const updateUserDetails = async (req, res) => {
  const { id, fullname, email, mobile } = req.body;
  try {
    const update = await User.findByIdAndUpdate(
      { _id: id },
      { fullname: fullname, email: email, mobile: mobile }
    );
    res.status(200).json({ message: "Details updated" });
  } catch (err) {
    res.status(400).json({ message: "Some error occured." });
  }
};

// change password
const changePassword = async (req, res) => {
  const { id, password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const update = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(400).json({ message: "Some error occured." });
  }
};

// get all user details
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

const sendOTP = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const OTP = generateOTP();
  const options = {
    from: "artvista.creative@gmail.com",
    to: email,
    subject: "OTP Verifaction from ArtVista",
    html: `<h1>OTP</h1><br/><p>Your OTP for registring into ArtVista: ${OTP}</p>`,
  };
  try {
    SendMail(options, OTP, res);
  } catch (error) {
    console.log(error);
  }
};

// verify if user is loged in or not
const verifyUser = async (req, res) => {
  const token = req.body.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decode);
};

// to generate a login token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};
module.exports = {
  register,
  emailMobileExists,
  login,
  verifyUser,
  getUserDetails,
  updateUserDetails,
  changePassword,
  sendOTP,
};
