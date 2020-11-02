const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorAppSchema = new Schema({
    sensorApp: {
        type: String,
        required:true
    },
    scenarioName: {
        type: String,
        required: true
    }

}, {timestamps: true});

// the name 'SensorApp' should be a singular of the collections name
const SensorApp = mongoose.model('SensorApp', sensorAppSchema)

module.exports = SensorApp;