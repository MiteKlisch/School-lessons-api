const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher',
  },
  class: [{
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Group',
  }],
  startLesson: { type: Date },
  endLesson: { type: Date },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
