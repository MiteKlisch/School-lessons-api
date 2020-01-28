// eslint-disable-next-line eslint linebreak-style

const mongoose = require('mongoose');
//  const Pupil = require('./pupil');

const groupSchema = new mongoose.Schema({
    nameGroup: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
    ref: 'Pupil'
  }],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
