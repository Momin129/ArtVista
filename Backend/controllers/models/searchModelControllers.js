const {
  Paintings,
  Sculptures,
  Artifacts,
  Monuments,
} = require("../../models/storageModel");

const searchModels = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    let searchedModels = [];

    const paintings = await Paintings.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    const sculptures = await Sculptures.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    const artifacts = await Artifacts.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    const monuments = await Monuments.find({
      title: { $regex: searchQuery, $options: "i" },
    });

    searchedModels = searchedModels.concat(
      paintings.map((painting) => ({ ...painting._doc, type: "painting" })),
      sculptures.map((sculpture) => ({ ...sculpture._doc, type: "sculpture" })),
      artifacts.map((artifact) => ({ ...artifact._doc, type: "artifact" })),
      monuments.map((artifact) => ({ ...artifact._doc, type: "monument" }))
    );

    res.status(200).json(searchedModels);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { searchModels };
