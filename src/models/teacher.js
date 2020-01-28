const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Lesson = require('./lesson');

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password" ');
      }
    },
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
},
{
  timestamps: true,
});

teacherSchema.virtual('lesson', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'teacher',
});


// eslint-disable-next-line func-names
teacherSchema.methods.toJSON = function () {
  const teacher = this;
  const teacherObject = teacher.toObject();

  delete teacherObject.password;
  delete teacherObject.tokens;

  return teacherObject;
};

// eslint-disable-next-line func-names
teacherSchema.methods.generateAuthToken = async function () {
  const teacher = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: teacher._id.toString() }, process.env.JWT_SECRET);

  teacher.tokens = teacher.tokens.concat({ token });
  await teacher.save();

  return token;
};

// Defining Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);


teacherSchema.statics.findByCredentials = async (email, password) => {
  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, teacher.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return teacher;
};

// Hash the palin text password before saving
// eslint-disable-next-line func-names
teacherSchema.pre('save', async function (next) {
  const teacher = this;

  if (teacher.isModified('password')) {
    teacher.password = await bcrypt.hash(teacher.password, 8);
  }

  next();
});

// Delete lessons when teacher is removed
// eslint-disable-next-line func-names
teacherSchema.pre('remove', async function (next) {
  const teacher = this;
  // eslint-disable-next-line no-underscore-dangle
  await Lesson.deleteMany({ teacher: teacher._id });

  next();
});

module.exports = Teacher;
