const { TodoSchema } = require("../models/todo");
const cookieParser = require('cookie-parser');


const addNewTodo = async (req, res) => {
    const { title, description, dueDate, dueTime, assignTo, level, associateWith, avatar } = req.body;
    const newData = {
        title,
        description,
        dueDate,
        dueTime,
        assignTo,
        level,
        createdAt: new Date().getTime(),
        associateWith,
        avatar
    }

    const data = await TodoSchema.create(newData);
    if (data) {
        res.status(200).json({ msg: "Todo added successfully", rData: data?._id })
    } else {
        res.status(400).json({ msg: "Can not added todo" })
    }


}

//----------------------- TO UPDATE TODOS ----------------------------
const updateTodos = async (req, res) => {
    const { title, description, dueDate, dueTime, assignTo, level, associateWith, id } = req.body;
    const updateData = await TodoSchema.findByIdAndUpdate(id, { title, description, dueDate, dueTime, assignTo, level, associateWith }, { new: true });
    if (updateData) {
        return res.status(200).json({ success: true, msg: "Updated successfully!" })
    }
    return res.status(400).json({ success: false, msg: "Something went wrong" })
}

// ----------------------------------- DELETE TODOS -----------------------
const deleteTodo = async (req, res) => {
    try {
        const id = req.body;
        const deleteTodo = await TodoSchema.findByIdAndDelete(id?.id);
        console.log("delete todo", deleteTodo);
        if (deleteTodo) {
            return res.status(200).json({ success: true, msg: "Delete successfully!" })
        }
        return res.status(400).json({ success: false, msg: "Something went wrong!" });
    } catch (error) {
        console.log("error is ", error);
    }
}




module.exports = { addNewTodo, updateTodos, deleteTodo }