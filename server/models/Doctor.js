const mongoose = require('mongoose');
// specify collection name for db
const DoctorSchema = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    registration: String,
    name: String,
    practices: [String],
    
});

const DoctorModel = mongoose.model('doctors', DoctorSchema);

module.exports = DoctorModel;