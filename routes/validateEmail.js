const express = require("express");
const router = express.Router();

const { validateUserMail, fetchUsers } = require("../controllers/validateUserMail.js");

router.post("/", validateUserMail);
router.get("/users", fetchUsers)

module.exports = router;