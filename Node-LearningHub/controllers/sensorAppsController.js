const SensorApp = require('../models/sensorApp');
const webSocketStuff = require('../WebSocketController/webSocketHandler');
const util = require('util');

//var sensorApp;
//var scenarioName;

const sensorApp_add_get = (req, res) => {
    res.render('sensorAppJoin', { title: 'Add a new sensorApp' }); 
    console.log('entered to controller for sensorApp test subscribe');
}

const sensorApp_subscribe_post = (req, res) => {
    const sensorAppReq = new SensorApp(req.body);
    res.render('sensorAppTest', { properties: sensorAppReq, title: 'sensorApp test' }); 
    console.log('entered to controller for sensorApp subscribe');
    

  //  console.log(util.inspect(req, {showHidden: false, depth: null}));

    webSocketStuff.ioInt(sensorAppReq.sensorApp, sensorAppReq.scenarioName);
    
}



module.exports = {
    sensorApp_add_get,
    sensorApp_subscribe_post 
  }