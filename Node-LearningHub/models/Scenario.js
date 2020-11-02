const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STARTTYPE = ["Automatic", "Manual"];
const STATUS = ["Stop","Start","Pause"];

const scenarioSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required: true
    },
    startType:{
       type: String, enum: STARTTYPE
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String, 
        enum: STATUS,
        default:'Stop' 
    }

}, {timestamps: true});

// the name 'Scenario' should be a singular of the collections name
const Scenario = mongoose.model('Scenario', scenarioSchema)

module.exports = Scenario;