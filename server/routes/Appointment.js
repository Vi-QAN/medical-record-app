const db = require('../config/db');
const Appoinment = db.appoinment;

const addAppointment = async (req,res) => {
    new Appoinment({
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
    Appoinment.updateOne({
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
    Appoinment.findOneAndDelete({
        _id: req.params.appointmentID,
        createdBy: req.params.id
    }).exec(err => {
        if (err) {res.status(400); throw err;}
        else res.status(204)
        return;
    })
}

const getAppointmentsByDoctor = async (req,res) => {
    Appoinment.find({
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

module.exports = {
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctor,
}

