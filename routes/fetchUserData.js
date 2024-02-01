const express = require("express");
const { fetchProfileData } = require("../controllers/fetchProfileData");
const router = express.Router();
//-----------route ------
router.get("/", fetchProfileData)
module.exports = router;    