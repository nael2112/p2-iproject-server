const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const authentication = require("../middlewares/authn");
const {User, Watchlist} = require("../models")


router.get("/news", Controller.getNews)
router.get("/markets", Controller.getCoins)
router.get("/coin", Controller.coinDetail)
router.get("/coin/history", Controller.coinHistory)
router.post("/login", Controller.login)
router.post("/register", Controller.register)

router.use(authentication);

router.get("/watchlist", Controller.getWatchlist)
router.post("/watchlist", Controller.addWatchlist)
router.delete("/watchlist", Controller.deleteWatchlist)

module.exports = router;
