const { default: mongoose } = require("mongoose");
const favSchema = require("../../models/favourites");
const {
  Paintings,
  Sculptures,
  Artifacts,
  Demo,
} = require("../../models/storageModel");

const addToFavourites = async (req, res) => {
  const { userId, modelId, type } = req.body;
  try {
    await favSchema.create({ userId, modelId, type });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ status: false });
  }
};

const removeFavourite = async (req, res) => {
  const { userId, modelId } = req.body;
  try {
    await favSchema.deleteOne({
      $and: [{ userId: userId }, { modelId: modelId }],
    });
    res.status(200).json({ status: false });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getFavourites = async (req, res) => {
  const modelId = req.query.modelId;
  const userId = req.query.userId;
  try {
    const fav = await favSchema.find({
      $and: [{ userId: userId }, { modelId: modelId }],
    });
    if (fav.length == 0) res.status(200).json({ status: false });
    else res.status(200).json({ status: true });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllFavourites = async (req, res) => {
  const userId = req.query.userId;

  try {
    const favList = await favSchema.find({ userId: userId });
    const modelIds = favList.map((item) => item.modelId);
    res.status(200).json(modelIds);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getModel = async (req, res) => {
  const type = req.query.type;
  const modelId = new mongoose.Types.ObjectId(req.query.modelId);

  let Schema;
  if (type == "painting") Schema = Paintings;
  else if (type == "sculpture") Schema = Sculptures;
  else if (type == "artifact") Schema = Artifacts;
  else Schema = Demo;

  try {
    const getmodel = await Schema.find({ _id: modelId });
    res.status(200).json({ getmodel });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const getFavouritesList = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query.userId);
  try {
    const favList = await favSchema.find({ userId: userId });
    res.json(favList);
  } catch (error) {
    res.status(400).json({ message: "Somethign went wrong" });
  }
};

module.exports = {
  addToFavourites,
  getFavourites,
  removeFavourite,
  getFavouritesList,
  getModel,
  getAllFavourites,
};
