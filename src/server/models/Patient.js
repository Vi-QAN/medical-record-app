const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    name: String,
    DOB: String,
    gender: String,
    address: String,

}, {collection: 'Patient'});

const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports = PatientModel;