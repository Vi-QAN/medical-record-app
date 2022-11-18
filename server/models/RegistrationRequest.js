const mongoose = require('mongoose');

const RegistrationRequestSchema = mongoose.Schema({
    to: String,
    from: String,
    accepted: Boolean,
});

const RegistrationRequestModel = mongoose.model("registrationrequest",RegistrationRequestSchema);

module.exports = RegistrationRequestModel;