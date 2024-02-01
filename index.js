const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use('/avatar', express.static('avatar')); //to use public assets like images etc
app.use(express.urlencoded({ extended: true })); //url encoder h it tells ki accept data from url as well it encodes the special character in url ex space with %20 etc 

const { connectDb } = require("./db.js");
const registerForm = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const addTodo = require("./routes/newTodo.js");
const authRoute = require("./routes/setAuth.js");
const getTodos = require("./routes/todoList.js");
const logoutRoute = require("./routes/logout.js");
const uploadUserAvatar = require("./routes/uploadAvatar.js");
const userData = require("./routes/fetchUserData.js");
const handleUserMail = require("./routes/validateEmail.js");

// app.use(cors());
// app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); //can perform action on user browers cookies


const port = process.env.port || 3001;
app.use("/register", registerForm);
app.use("/login", loginRoute);
app.use("/api/createTodo", addTodo);
app.use("/api/setAuth", authRoute);
app.use("/api/getTodos", getTodos);
app.use("/api/logout", logoutRoute);
//special route for 
app.use("/api/uploadAvatar", uploadUserAvatar);
app.use("/api/fetchProfileData", userData);
app.use("/api/validateEmail", handleUserMail);


connectDb().then(() => {
    server.listen(port, () => {
        console.log(`server started at port ${port}`);
    })
})