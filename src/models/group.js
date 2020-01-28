const mongoose = require('mongoose');
//  const Pupil = require('./pupil');

const groupSchema = new mongoose.Schema({
  nameGroup: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Pupil',
  }],
});

groupSchema.virtual('lesson', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'groupOfPupils',
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
