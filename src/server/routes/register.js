const db = require("../config/db");
const bcrypt = require("bcryptjs");
const Roles = db.ROLES;
const Doctor = db.doctor;
const Patient = db.patient;

const validateEmail = ({email, role}) => {
    role === Roles.doctor ? 
    Doctor.findOne({
        email: email,
    }).exec((err,doctor) => {
        if (err) {
            return false;
        }
        if (doctor) {   
            return false;
        }
        return true;
    })
    :
    Patient.findOne({
        email: email,
    }).exec((err,patient) => {
        if (err) {
            return false;
        }
        if (patient) {   
            return false;
        }
        return true;
    })
}

const validateRole = ({role}) => {
    return !Roles.hasOwnProperty(role) ? false : true;
}

const register = (req,res) => {
    if (!validateEmail(req.body.email) || !validateRole(req.body.role)) {
        res.status(400).send({validated: false});
    }
    
    if (req.body.role === Roles.doctor){
        const doctor = new Doctor({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            registration: req.body.registration,
            name: req.body.name,
            practices: [],
        });

        doctor.save()
        .then(console.log("Doctor added"))
        .then(res.send({
            message: "Registered successfully",
        }))
        .catch(err => {
            console.log("")
        }) 
            
    }
    else {
        const patient = new Patient({
            email: req.body.email,
            password: String,
            name: String,
            DOB: String,
            gender: String,
            address: String,
        })
        patient.save()
        .then(console.log("Patient added"))
        .then(res.send({
            message: "Registered successfully",
        }))
        .catch(err => {
            console.log("")
        }) 
    }

    
}

export default register;