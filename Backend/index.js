const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/contactRoutes"));
app.use("/api/model", require("./routes/fileRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT: ${process.env.PORT}`);
});
