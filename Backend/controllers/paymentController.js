const { UserUpload } = require("../models/userUploadModel");
const Razopay = require("razorpay");
const crypto = require("crypto");

const instance = new Razopay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.RAZOR_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = { amount: Number(req.body.amount * 100), currency: "INR" };
    const order = await instance.orders.create(options);
    res.status(200).json({ sucess: true, order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const user_id = req.query.user_id;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await UserUpload.findOneAndUpdate(
        { user_id: user_id },
        { status: "Payed", payment_id: razorpay_payment_id }
      );

      res.redirect(
        `http://localhost:5173/dashboard?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkout, paymentVerification };
