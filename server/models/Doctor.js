const mongoose = require('mongoose');
// specify collection name for db
const DoctorSchema = mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    registration: String,
    name: String,
    practice: String,
    patientList: [String],
    
});

const DoctorModel = mongoose.model('doctors', DoctorSchema);

module.exports = DoctorModel;