const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    createdBy: String,
    patientID: String,
    dateTime: Date,
    isAvalable: Boolean,
}, {collection: 'Appointment'});

const AppointmentModel = mongoose.model("Appointment",AppointmentSchema);

module.exports = AppointmentModel;