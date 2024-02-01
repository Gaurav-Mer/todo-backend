const express = require("express");
const { addNewTodo, updateTodos, deleteTodo } = require("../controllers/newTodo");
const router = express.Router();
const validateToken = require("../middlleware/validateToken.js")

//middleware to check token
router.use("/", validateToken);
//routes
router.post("/", addNewTodo);
router.post("/update", updateTodos);
router.post("/delete", deleteTodo);

module.exports = router;