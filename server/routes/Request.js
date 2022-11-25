const db = require('../config/db');
const Request = db.registrationRequest;

 

const deleteRequest = async (req,res) => {
    Request.deleteOne({_id: req.params.requestID}).exec((err,doc) => {
        if (err) throw err;
        if (!doc) {res.status(404); return;}
        res.status(200);
        return;
    })
}

module.exports = {
    deleteRequest
}