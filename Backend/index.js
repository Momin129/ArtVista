const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));



app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/favoritesRoute"));
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/models", require("./routes/modelRoutes"));
app.use("/api/userUploads", require("./routes/userUploads"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.use("/api/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZOR_KEY });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT: ${process.env.PORT}`);
});
