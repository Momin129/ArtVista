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

  if (latestPainting[0].length > 0) latestModels.push(latestPainting[0]);
  if (latestSculpture[0].length > 0) latestModels.push(latestSculpture[0]);
  if (latestArtifact[0].length > 0) latestModels.push(latestArtifact[0]);

  res.json(latestModels);
};

module.exports = { getLatestModels };
