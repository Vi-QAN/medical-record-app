const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'},
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    dateTime: Date,
    isAvalable: Boolean,
})

const AppointmentModel = mongoose.model("Appointment",AppointmentSchema);

module.exports = AppointmentModel;