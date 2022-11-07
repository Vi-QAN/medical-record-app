const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    DOB: String,
    gender: String,
    address: String,

})

const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports = PatientModel;