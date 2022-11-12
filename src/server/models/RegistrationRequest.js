const mongoose = require('mongoose');

const RegistrationRequestSchema = mongoose.Schema({
    to: String,
    from: String,
    accepted: Boolean,
}, {collection: 'RegistrationRequest'});

const RegistrationRequestModel = mongoose.model("RegistrationRequest",RegistrationRequestSchema);

module.exports = RegistrationRequestModel;