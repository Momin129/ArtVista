const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  modelId: { type: mongoose.Schema.Types.ObjectId, ref: "models" },
});

const Paintings = mongoose.model("Paintings", fileSchema);
const Sculptures = mongoose.model("Sculptures", fileSchema);
const Artifacts = mongoose.model("Artifacts", fileSchema);
const Demo = mongoose.model("Demos", fileSchema);

module.exports = { Paintings, Sculptures, Artifacts, Demo };
