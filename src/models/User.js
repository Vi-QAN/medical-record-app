const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    id: String,
})

const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;