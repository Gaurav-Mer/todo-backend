const express = require("express");
const router = express.Router();

const { signUp, testing } = require("../controllers/auth");

router.get("/", testing);
router.post("/", signUp);

module.exports = router;