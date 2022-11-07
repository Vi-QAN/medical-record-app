const mongoose = require('mongoose');

const RegistrationRequestSchema = mongoose.Schema({
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    accepted: Boolean,
})

const RegistrationRequestModel = mongoose.model("RegistrationRequest",RegistrationRequestSchema);

module.exports = RegistrationRequestModel;