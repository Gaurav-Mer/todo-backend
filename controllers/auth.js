const { UserModel } = require("../models/user");
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const extractDataFromToken = require("../commonFunc/getToken");
const fs = require("fs")

const SECRET_KEY = "kUCHbji21@8*2dd"


const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const isAlready = await UserModel.findOne({ email });
    if (isAlready) {
        return res.status(400).json({ msg: { email: "EMAIL ALREADY EXIST" } })
    }

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    const adminRole = ["gouravmer22@gmail.com"]

    const userData = {
        name,
        email,
        password: hashPassword,
        u_id: `${new Date().getTime()}_${name}`,
        isActive: true,
        role: adminRole?.includes(email) ? "admin" : "user"
    }

    //validate data here :-
    const errorData = validateData(userData);
    if (errorData) {
        return res.status(400).json({ msg: errorData })
    }
    const data = await UserModel.create(userData);
    //jwt create here and set in cookie for httpOnly
    let tokenData = {};
    if (data) {
        // Set the JWT in an HttpOnly cookie
        const token = jwt.sign({ id: data?._id, name: data?.name, email: data?.email, avatar: "" }, SECRET_KEY, { expiresIn: '7d' });
        const oneHourFromNow = new Date(Date.now() + 7 * 60 * 60 * 1000); // 1 hour in milliseconds
        res.cookie('DO_NOT_SHARE', token, { httpOnly: true, expires: oneHourFromNow, sameSite: 'None', secure: true });
        if (token) {
            const respData = await extractDataFromToken(token);
            if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
                tokenData = respData?.data;
            }
        }
    }
    res.status(200).json({ msg: "user added successfully!", token: "token", rData: tokenData })
}

const testing = async (req, res) => {
    res.send({ name: "" })
}

//  ---------------------LOGIC FOR THE LOGIN PURPOSE----------------------------------------
const login = async (req, res) => {
    const { email, password } = req.body;
    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("current url is as login", currentUrl);


    const isAlready = await UserModel.findOne({ email });
    if (!isAlready || isAlready === null) {
        return res.status(400).json({ msg: { email: "No user Found" } })
    }

    ///valdiate password here :-
    const passMatch = await bcrypt.compare(password, isAlready.password);
    if (!passMatch) {
        res.status(400).json({ msg: { password: "Invalid Password" } })
    } else {
        const token = jwt.sign({ id: isAlready?._id, name: isAlready?.name, email: isAlready?.email, avatar: isAlready?.avatar ? isAlready?.avatar : "" }, SECRET_KEY, { expiresIn: '7d' });

        // Set the JWT in an HttpOnly cookie
        const oneHourFromNow = new Date(Date.now() + 7 * 60 * 60 * 1000); // 1 hour in milliseconds
        res.cookie('DO_NOT_SHARE', token, { httpOnly: true, expires: oneHourFromNow, path: "/" });
        let userData = {};
        if (token) {
            const respData = await extractDataFromToken(token);
            if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
                userData = respData?.data;
            }
        }
        //checking that token email and currentEmail match then sending user data as well
        res.status(200).json({ msg: "Login Successfully", token: "token", rData: userData })
    }
}

const validateData = (data) => {
    if (!data?.name || data?.name?.length <= 0) {
        return "Invalid Name"
    }
    if (!data?.email || data?.email?.length <= 0) {
        return "Invalid Email"
    }
    if (!data?.password || data?.password?.length <= 0) {
        return "Invalid Password"
    }

}


const logout = async (req, res) => {
    const resp = await res.cookie("DO_NOT_SHARE", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ success: true });
}

// --------------------- UPLAOD USER PROFILE --------------------------
const uploadProfileToDb = async (req, res) => {
    try {
        //here i am getting the id of the profile so that i can add the image to that location in DB
        const { id, image_id } = req.body;
        const avatarData = {
            data: req.file.filename,
            contentType: req.file.mimetype,
            path: req.file.path
        }
        //unlinking the image if that image already in db
        if (image_id) {
            try {
                if (fs.existsSync(image_id)) {
                    fs.unlinkSync(image_id);
                }
            } catch (error) {
                console.log("ERROR WHILE DELETING IMAGE ");
            }
        }

        if (id) {
            const updateData = await UserModel.findByIdAndUpdate(id, { avatar: avatarData }, { new: true });
            if (updateData) {
                return res.status(200).json({ success: true, msg: "Avatar uploaded successfully!", rData: updateData })
            }
            return res.status(402).json({ msg: "No data found!" })
        }
        res.status(403).json({ success: false, msg: "Something went wrong!" })

    } catch (error) {
        res.status(400).json({ msg: `Something went wrong! ${error}` })
    }
}


module.exports = { signUp, testing, login, logout, uploadProfileToDb }

