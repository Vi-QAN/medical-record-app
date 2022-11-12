const mongoose = require('mongoose');
// specify collection name for db
const DoctorSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    registration: String,
    name: String,
    practices: [String],
    
}, {collection: 'Doctor'});

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

module.exports = DoctorModel;