const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const HOST = "localhost"; // ip address of database
const PORT = 0; // which port it's running on
const DB = ''; // name of the database

const db = {};

db.mongoose = mongoose;
db.connection = "mongodb://" + HOST + ":" + PORT + "/" + DB;
db.appoinment = require("./models/Appointment");
db.doctor = require("./models/Doctor");
db.patient = require("./models/Patient");
db.registrationRequest = require("./models/RegistrationRequest");
// db.user = require("./models/User")
// db.role = require("./models/Role");

db.ROLES = {
    doctor: "doctor",
    patient:  "patient"
};

module.exports = db;