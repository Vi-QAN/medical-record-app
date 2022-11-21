const db = require("../config/db");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = db.user;
const Doctor = db.doctor;
const Patient = db.patient;
const ROLES = require('../constant/ROLES');

dotenv.config();

const generateAccessToken = ({id}) => {
    return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn: "216000s"})
}

const verifyToken = (req,res) => {
    // get token
    const token = req.body.token;

    // verify token
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function(err,decoded) {
            if (err){
                res.status(401).json({
                    login: false,
                })
            }
            if (decoded){
                res.status(200).json({
                    login: true,
                    id: decoded.id,
                })
            }

        });
    }
    else {
        // Return response with error
        res.status(404).json({
            login: false,
        })
    }
}

const verifyUser = (req, res, next) => {
    // get first character from id
    const initChar = req.body.id[0];
    if (initChar === 'D'){
        Doctor.findOne({
            id: req.body.id,
        }, function(err, user){
            if (err){
                throw err;
            } 
            if(!user) {
                res.status(404).json({
                    errorID: true,
                    message: "Wrong ID entered"})
                return;
            }

            if (user.password !== req.body.password){
                res.status(404).json({
                    errorPass: true,
                    message: "Wrong password entered"})
                return;
            }
            next();
        })
    }
    else {
        Patient.findOne({
            id: req.body.id
        }, function(err, user){
            if (err || !user) {
                res.status(404).send({
                    errorID: true,
                    message: "Wrong ID entered"})
                return;
            }

            if (user.password !== req.body.password){
                res.status(404).send({
                    errorPass: true,
                    message: "Wrong password entered"})
                return;
            }
            next();
        })
    }
    
    
}

const saveUser = async (req,res) => {
    const accessToken = generateAccessToken({id: req.body.id});
    User.findOne({id: req.body.id}, function(err, user) {
        if (err){
            throw err
            return;
        }
        if (!user){
            // create new if not found in user table
            new User({
                id: req.body.id,
                token: accessToken
            }).save(err => {
                if (err){
                    res.status(500).send({message: "Error loging in"});
                    return;
                }
            })
        }
        else {
            // update if already in User table
            User.updateOne({id: req.body.id}, {token: accessToken}, function(err,user) {
                if (err) return err;
            });
        }
        
    })
    
    res.status(200).send({
        message: "Login successfully",
        token: accessToken,
        id: req.body.id,
        role: req.body.id[0] === 'D' ? ROLES.DOCTOR : ROLES.PATIENT,
    })
    return;
}
module.exports = {
    verifyToken,
    verifyUser,
    saveUser
}