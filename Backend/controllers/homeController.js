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

  if (latestPainting.length > 0) latestModels.push(latestPainting[0]);
  if (latestSculpture.length > 0) latestModels.push(latestSculpture[0]);
  if (latestArtifact.length > 0) latestModels.push(latestArtifact[0]);
  res.json(latestModels);
};

module.exports = { getLatestModels };
