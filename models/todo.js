const mongoose = require("mongoose");

const todoScheme = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignTo: { type: String, required: true },
    dueDate: { type: String, required: true },
    dueTime: { type: String, required: true },
    level: { type: String },
    associateWith: { type: Array },
    createdAt: { type: Number },
    avatar: { type: String },
});

const TodoSchema = mongoose.model('TodoSchema', todoScheme);
module.exports = { TodoSchema };
