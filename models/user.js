const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    data: String,
    contentType: String,
    path: String
})

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: imageSchema,
    u_id: { type: String, unique: true },
    isActive: { type: Boolean },
    role: { type: String },
    metaData: { type: mongoose.Schema.Types.Mixed }
});

const UserModel = mongoose.model('UserSchema', UserSchema);
module.exports = { UserModel };
