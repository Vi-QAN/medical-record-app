const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    _id: String,
    createdBy: String,
    patientID: String,
    startDate: Date,
    endDate: Date,
    state: String,
    notes: String,
    title: String,
});

const AppointmentModel = mongoose.model("appointments",AppointmentSchema);

module.exports = AppointmentModel;