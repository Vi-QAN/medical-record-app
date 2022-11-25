const mongoose = require('mongoose');

const RegistrationRequestSchema = mongoose.Schema({
    _id: String,
    to: String,
    from: String,
    date: Date,
    accepted: Boolean,
});

const RegistrationRequestModel = mongoose.model("registrationrequest",RegistrationRequestSchema);

module.exports = RegistrationRequestModel;