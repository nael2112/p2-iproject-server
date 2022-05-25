const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index")


router.get("/markets", Controller.getCoins)
router.get("/coin", Controller.coinDetail)
router.get("/coin/history", Controller.coinHistory)

module.exports = router;
