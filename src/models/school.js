const mongoose = require('mongoose');
//const validator = require('validator');

const schoolSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true,
        trim: true
    },
    teacher: {
        type: String,
        required: true,
        trim: true
    },
    groupOfPupils: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Must be a positive number!')
            }
        }
    },
    statDate: { type: Date },
    endDate: { type: Date }

});


const School = mongoose.model('School', schoolSchema);

module.exports = School;