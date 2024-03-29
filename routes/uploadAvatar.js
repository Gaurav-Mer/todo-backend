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

// IF I WANT TO UPLOAD IMAGE TO CLOUD SERVICE THEN NO NEED TO UPLOAD.SINGLE("AVATAR")
//BECAUSE WE ARE STORING IT IN CLOUD SERVICE
//TAKE A MEDIA FROM USER ====> BY USING MULTER STORE IMAGE IN THE  REQ.FILES
//  =========> TAKE IMAGE FORM REQ.FILES STORE IN CLOUD ====> CLOUD

// =====================CODE FOR ONLY STORING FILES IN Request.FILES ==========
/*
const storage  = multer.diskstorage({
    destination : function(req,file,cb) {
        cb(null,"./avatar")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ "-",file.originalname)
    }
});

export const multer({storage});


----------------------- USE IT AS MIDDLEWARE IN REGISTER PAGE --------------------
router.post("/register",upload.single("avatar"),  registerController)
                                   OR 
 HERE "upload
 " WILL THE ABOVE CODE WE DO ^^^^^^^^^^^^^^^^^^^^^^                                  
router.post("/register",upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:3}]),registerController);
 -: now in registerController i will have access of these files :-

NOTE ----> AS SOON AS MEDIA UPLOAD ON CLOUD THEN DO FS.UNLINK(FILE)----------------

 */ 

