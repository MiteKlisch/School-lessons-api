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
    class: {
        type: String,
        trim: true
    },
    groupOfPupils: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Must be a positive number!')
            }
        }
    },
    startDate: { type: Date },
    endDate: { type: Date }
});

schoolSchema.pre('save', async function (next) {
    const lesson = this;
    
    console.log('just before saving')

    next();
})


const School = mongoose.model('School', schoolSchema);

module.exports = School;