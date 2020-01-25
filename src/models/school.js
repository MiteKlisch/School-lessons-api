const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true,
        trim: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
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

const School = mongoose.model('School', schoolSchema);

module.exports = School;