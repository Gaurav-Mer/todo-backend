const express = require("express");
const router = express.Router();

const { handlePayment, getSubscriptionList } = require("../controllers/handleTeamSubs");
router.post("/", handlePayment);
router.get("/", getSubscriptionList)

module.exports = router