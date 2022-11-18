const db = require("../config/db");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = db.user;
const Doctor = db.doctor;
const Patient = db.patient;

dotenv.config();

const generateAccessToken = ({id}) => {
    return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn: "216000s"})
}

const verifyToken = (req,res,next) => {
    jwt.verify()

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
                res.status(404).json({message: "Wrong ID entered"})
                return;
            }

            if (user.password !== req.body.password){
                res.status(404).json({message: "Wrong password entered"})
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
                res.status(404).send({message: "Wrong ID entered"})
                return;
            }

            if (user.password !== req.body.password){
                res.status(404).send({message: "Wrong password entered"})
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
        token: accessToken
    })
    return;
}
module.exports = {
    verifyToken,
    verifyUser,
    saveUser
}