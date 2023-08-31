const express = require("express");
const {
  getFavourites,
  addToFavourites,
  removeFavourite,
  getFavouritesList,
  getModel,
} = require("../controllers/userFavourites");

const router = express.Router();

router.get("/favourites", getFavourites);
router.get("/favouritesList", getFavouritesList);
router.get("/getModel", getModel);
router.post("/addFavourite", addToFavourites);
router.post("/removeFavourtie", removeFavourite);

module.exports = router;
