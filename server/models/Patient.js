const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    name: String,
    DOB: Date,
    gender: String,
    address: String,

});

const PatientModel = mongoose.model("patients", PatientSchema);

module.exports = PatientModel;