const mongoose = require("mongoose");
const { Paintings, Sculptures, Artifacts } = require("../models/storageModel");

const getLatestModels = async (req, res) => {
  const latestModels = [];
  const latestPainting = await Paintings.find()
    .limit(1)
    .sort({ $natural: -1 })
    .select("title thumbnail -_id");
  const latestSculpture = await Sculptures.find()
    .limit(1)
    .sort({ $natural: -1 })
    .select("title thumbnail -_id");
  const latestArtifact = await Artifacts.find()
    .limit(1)
    .sort({ $natural: -1 })
    .select("title thumbnail -_id");

  latestModels.push(latestPainting[0], latestSculpture[0], latestArtifact[0]);

  res.json(latestModels);
};

module.exports = { getLatestModels };
