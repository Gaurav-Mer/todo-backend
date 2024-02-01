const express = require("express");
const router = express.Router();
const { getAllTodos } = require("../controllers/allTodos");

router.get("/", getAllTodos);

module.exports = router;