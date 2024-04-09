const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        require: true
    },
    class: {
        type: String,
        require: true 
    }
});

module.exports = mongoose.model('student', studentSchema);