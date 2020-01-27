const mongoose = require('mongoose');
const Group = require('./group');
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

//Delete groups when user is removed
// pupilSchema.pre('remove', async function (next) {
//     const pupil = this;
//     await Group.deleteMany({ pupil: pupil._id });

//     next();
// });

const Pupil = mongoose.model('Pupil', pupilSchema);

module.exports = Pupil;