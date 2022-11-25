const db = require('../config/db');
const Appointment = db.appoinment;

const addAppointment = async (req,res) => {
    new Appointment({
        _id: req.body._id,
        createdBy: req.params.id,
        patientID: req.body.patientID,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        state: req.body.state,
        notes: req.body.notes,
        title: req.body.title,
    }).save((err, appoinment) => {
        if (err) {
            res.status(500).json({message: "Error creating appointment"})
            return;
        }
        if (appoinment){
            res.status(200).json({message: "Appoinment successfully created"})
            return;
        }
    })
}

const updateAppointment = async (req,res) => {
    Appointment.updateOne({
        _id: req.params.appointmentID,
        createdBy: req.params.id,
    },{ patientID: req.body.patientID,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        state: req.body.state,
        notes: req.body.notes,
        title: req.body.title,}).exec((err, appointment) => {
        if (err){
            res.status(400);
        }
        else {
            res.status(200);
        }
        return;
    })
}

const deleteAppointment = async (req,res) => {
    Appointment.findOneAndDelete({
        _id: req.params.appointmentID,
        createdBy: req.params.id
    }).exec(err => {
        if (err) {res.status(400); throw err;}
        else res.status(204)
        return;
    })
}

const getAppointmentsByDoctor = async (req,res) => {
    Appointment.find({
        createdBy: req.params.id,
    }).exec((err, appointments) => {
        if (err) {
            res.status(500).json({message: err})
            return;
        }
        if (appointments) {
            res.status(200).json({appointments: appointments});
            return;
        }
    })
}

const cancelAppointment = async (req,res) => {
    Appointment.updateOne({
        _id: req.params.id
    },{ patientID: req.body.patientID,
        state: req.body.state,
    }).exec((err,doc) => {
        if (err){
            res.status(400);
        }
        else {
            res.status(200);
        }
        return;
    })
}

const getAppointmentsByPatient = async (req,res) => {
    Appointment.find({
        patientID: req.params.id
    }).exec((err, appointments) => {
        if (err) {
            res.status(500).json({message: err})
            return;
        }
        if (appointments) {
            res.status(200).json({appointments: appointments});
            return;
        }
    })
}

module.exports = {
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    cancelAppointment,
}

