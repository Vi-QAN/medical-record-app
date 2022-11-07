const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    email: String,
    password: String,
    registration: String,
    name: String,
    practices: [],
    
})

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

module.exports = DoctorModel;