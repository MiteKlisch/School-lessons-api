const mongoose = require('mongoose');

const pupilSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    group: {
        type: Number,
        default: 1
    }
})