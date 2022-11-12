const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const HOST = "localhost"; // ip address of database
const USERNAME = "docker";
const PASSWORD = "mongopw";
const PORT = 49153; // which port it's running on
const DB = 'MedicalDatabase'; // name of the database

const db = {};

db.mongoose = mongoose;
// add ?authSource=admin to resolve authentication error
db.connection = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB}?authSource=admin`;
db.appoinment = require("../models/Appointment");
db.doctor = require("../models/Doctor");
db.patient = require("../models/Patient");
db.registrationRequest = require("../models/RegistrationRequest");
// db.user = require("./models/User")
// db.role = require("./models/Role");

db.ROLES = {
    doctor: "doctor",
    patient:  "patient"
};

module.exports = db;