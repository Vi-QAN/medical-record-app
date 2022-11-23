const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    token: String
})
const UserModel = mongoose.model("users",UserSchema);

module.exports = UserModel;

