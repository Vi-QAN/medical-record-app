const db = require("../config/db");
const Doctor = db.doctor;
const Request = db.registrationRequest;

// generate id for doctor with prefix D
const generateID = ({initial, registration}) => {
    return initial + registration;
}

// check registration number is in database
const validateRegistration = async (req, res, next) => {
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
                error: true,
                message: "Registration is already used"});
            return;
        }
        next();
    })

}

// check if email is in database
const validateEmail = async (req, res, next) => {
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

// get patient list
const getPatientList = async (req,res) => {
    // get patient list from doctor database
    Doctor.findOne({
        _id: req.params.id,
    }, {"patientList" : 1}).exec((err, doc) => {
        if (err) {
            throw err;
        }

        if (!doc){
            res.status(404).json({
                message: 'Patient list is empty'
            })
            return;
        }
        
        res.status(200).json(doc);
    })
}

const updatePatientList = async (req,res) => {
    Doctor.updateOne({
        _id: req.params.id,
    },{$addToSet: {patientList: req.body.patientID}}).exec((err, doc) => {
        if (err) throw err;
        if (!doc) res.status(404).json({message: "Document not found"})
        res.status(200).json({
            message: "Updated successfully"
        });
    })   
}
const saveDoctor = async function (req,res) {
    const doctorID = generateID({initial: 'D', registration: req.body.registration});
    const doctor = new Doctor({
        _id: doctorID,
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
                id: doctorID,
                message: "Registered successfully",
            });
            return;
        }
        
    })
}

const getRequestList = async (req,res) => {
    Request.find({
        to: req.params.id
    }).exec((err,doc) => {
        if (err) throw err;
        if (!doc) {
            res.status(404).json({message: "No request made"})
            return;
        }
        res.status(200).json(doc)
        return;
    })
} 



module.exports = {
    validateEmail,
    validateRegistration,
    getPatientList,
    updatePatientList,
    getRequestList,
    saveDoctor
};