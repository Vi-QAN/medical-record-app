const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    role: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    id: String,
})

const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;