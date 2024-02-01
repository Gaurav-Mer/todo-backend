// db.js
const mongoose = require('mongoose');
// let url = "mongodb+srv://gouravmer22:71ur1vmer@cluster0.sfhvlq8.mongodb.net/?retryWrites=true&w=majority"
let url = `mongodb+srv://gouravmer22:71ur1vmer@cluster0.pbqr3pl.mongodb.net/todo_app?retryWrites=true&w=majority`



const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("db connected")

    } catch (error) {
        console.log("db error is ", error)
    }
}

module.exports = { connectDb };

