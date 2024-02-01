const express = require("express");
const router = express.Router();
const { setAuth } = require("../controllers/setAuth")

router.get("/", setAuth);
module.exports = router;