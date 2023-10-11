const express = require("express");
const {
  getFavourites,
  addToFavourites,
  removeFavourite,
  getFavouritesList,
  getModel,
  getAllFavourites,
} = require("../controllers/users/userFavourites");

const router = express.Router();

router.get("/favourites", getFavourites);
router.get("/favouritesList", getFavouritesList);
router.get("/getModel", getModel);
router.post("/addFavourite", addToFavourites);
router.post("/removeFavourtie", removeFavourite);
router.get("/getAllFavourites", getAllFavourites);

module.exports = router;
