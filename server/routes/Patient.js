
const db = require('../config/db');
const Patient = db.patient;

const getPatientInfo = async (req,res) => {
    Patient.findOne({
        _id: req.params.id
    }).exec((err, doc) => {
        if (err) throw err;
        if (!doc) res.status(404).json({message: "Document not found"})
        res.status(200).json(doc)
    })
}

const updatePatientInfo = async (req,res) => {
    Patient.updateOne({
        _id: req.params.id,
    },{ email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address}).exec((err, doc) => {
        if (err){
            res.status(400);
            
        }
        else {
            res.status(200);
        }
        return;
    })
}

const updatePatientImage = async (req, res) => {
    console.log(req.body.image);
    Patient.updateOne({
        _id: req.params.id
    },{image: req.body.image}).exec((err, doc) => {
        if (err){
            res.status(400);
            
        }
        else {
            res.status(200);
        }
        return;
    })
}
module.exports = {
    getPatientInfo,
    updatePatientInfo,
    updatePatientImage,
}