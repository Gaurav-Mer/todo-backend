const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadProfileToDb } = require("../controllers/auth")


//here multer is using local disc to store the image and it will store image buffer in mongo db
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './avatar')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

router.post("/", upload.single("avatar"), uploadProfileToDb)

module.exports = router;