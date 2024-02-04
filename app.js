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
app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173", "https://todo-list-backend-3ytm.onrender.com"] }));
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
app.get("/test", (req, res) => {
    res.send({ name: "gaurav mer " })
})
app.get("/", (req, res) => res.type('html').send(html));



connectDb().then(() => {
    server.listen(port, () => {
        console.log(`server started at port ${port}`);
    })
})



const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>`