const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    name: String,
    DOB: String,
    gender: String,
    address: String,

})

const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports = PatientModel;