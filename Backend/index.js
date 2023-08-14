const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/contactRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT: ${process.env.PORT}`);
});
