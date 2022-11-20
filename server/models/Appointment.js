const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    createdBy: String,
    patientID: String,
    startDate: Date,
    endDate: Date,
    state: String,
    notes: String,
});

const AppointmentModel = mongoose.model("appointments",AppointmentSchema);

module.exports = AppointmentModel;