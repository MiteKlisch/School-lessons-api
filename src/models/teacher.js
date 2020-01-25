const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const School = require('../models/school');

const teacherSchema =  new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes('password') ) {
                throw new Error('Password cannot contain "password" ')
            }
        }
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]    
},
{
    timestamps: true
}
);

teacherSchema.virtual('school', {
    ref: 'School',
    localField: '_id',
    foreignField: 'teacher'
});

teacherSchema.methods.toJSON = function () {
    const teacher = this;
    const teacherObject = teacher.toObject();

    delete teacherObject.password;
    delete teacherObject.tokens;

    return teacherObject;
};

teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this;
    const token = jwt.sign({ _id: teacher._id.toString()}, 'secretword');

    teacher.tokens = teacher.tokens.concat({ token });
    await teacher.save();

    return token;
}

teacherSchema.statics.findByCredentials = async (email, password) => {
    const teacher = await Teacher.findOne({email});

    if (!teacher) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return teacher;
}

//Hash the palin text password before saving
teacherSchema.pre('save', async function (next) {
    const teacher = this;
    
    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }

    next();
});

//Delete user tasks when user is removed
teacherSchema.pre('remove', async function () {
    const teacher = this;
    await School.deleteMany({ teacher: teacher._id });

    next();
})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

