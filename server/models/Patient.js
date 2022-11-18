const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    name: String,
    DOB: String,
    gender: String,
    address: String,

});

const PatientModel = mongoose.model("patients", PatientSchema);

module.exports = PatientModel;