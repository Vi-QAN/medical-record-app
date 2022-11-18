
const db = require("../config/db");
const Doctor = db.doctor;

const generateID = ({initial, registration}) => {
    return initial + registration;
}

const validateRegistration = (req, res, next) => {
    Doctor.findOne({registration: req.body.registration
    }).exec((err,doctor) => {
        if (err) {
            res.status(500).send({
                errorReg: true,
                message: err
            })
            return;
        }
        if (doctor) {   
            res.status(400).send({
                errorReg: true,
                message: "Registration is already used"});
            return;
        }
        next();
    })

}

const validateEmail = (req, res, next) => {
    res.header('Content-Type', 'application/json')
    Doctor.findOne({email: req.body.email
    }).exec((err, doctor) => {
        if (err){
            res.status(500).send({
                errorEmail: true,
                message: err})
            return;
        }
        if (doctor){
            res.status(400).send({
                errorEmail: true,
                message: "Email is already used"})
            return;
        }
        next();
    });
}

const saveDoctor = async function (req,res) {
    const doctorID = generateID({initial: 'D', registration: req.body.registration});
    const doctor = new Doctor({
        id: doctorID,
        email: req.body.email,
        password: req.body.password,
        registration: req.body.registration,
        name: req.body.name,
        practices: [req.body.practices],
    });
    doctor.save((err, doc) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (doc){
            res.status(200).send({
                error: false,
                id: doctorID,
                message: "Registered successfully",
            });
            return;
        }
        
    })
    
}

module.exports = {
    validateEmail,
    validateRegistration,
    saveDoctor
};