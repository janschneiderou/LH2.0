const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    Name: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

}, {timestamps: true});

// the name 'Classroom' should be a singular of the collections name
const Classroom = mongoose.model('Classroom', classroomSchema)

module.exports = Classroom;