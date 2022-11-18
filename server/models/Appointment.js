const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    createdBy: String,
    patientID: String,
    dateTime: Date,
    isAvalable: Boolean,
});

const AppointmentModel = mongoose.model("appointments",AppointmentSchema);

module.exports = AppointmentModel;