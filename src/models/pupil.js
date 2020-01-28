const mongoose = require('mongoose');
const pupilSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')   
            }
        }
    }
});

pupilSchema.virtual('group', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'students'
});

const Pupil = mongoose.model('Pupil', pupilSchema);

module.exports = Pupil;