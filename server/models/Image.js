const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    _id: String,
    image: {
        data: Buffer,
        contentType: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('images', ImageSchema)