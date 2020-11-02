const Scenario = require('../models/Scenario');
const webSocketStuff = require('../WebSocketController/webSocketHandler');
const util = require('util');

const scenario_index = (req, res) => {
    Scenario.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('scenarioIndex', { scenarios: result, title: 'All scenarios' });
      })
      .catch(err => {
        console.log(err);
      });
  }

const scenario_details = (req, res) => {
    const id = req.params.id;
    Scenario.findById(id)
      .then(result => {
        console.log('enter the controller details');
        res.render('scenarioDetails', { scenario: result, title: 'Scenario Details' });
        
        console.log(result.name+'C websocket about to be created');
        webSocketStuff.ioInt(result.name+'C', result.name);
      })
      .catch(err => {
        console.log(err);
        res.render('404', { title: 'Scenario not found' });
      });
  }

const scenario_create_get = (req, res) => {
    res.render('createScenario', { title: 'Create a new scenario' }); 
    console.log('entered to controller for scenario');
}
  
  const scenario_create_post = (req, res) => {
    const scenario = new Scenario(req.body);
    //console.log(util.inspect(req, {showHidden: false, depth: null}));
    scenario.save()
      .then(result => {
        res.redirect('/scenario/scenario'); //TODO add redirect to scenarios
      })
      .catch(err => {
        console.log(err);
      });
  }

  const scenario_delete = (req, res) => {
    const id = req.params.id;
    Scenario.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' }); //TODO add redirect to scenarios
      })
      .catch(err => {
        console.log(err);
      });
  }

  module.exports = {
    scenario_index, 
    scenario_details, 
    scenario_create_get, 
    scenario_create_post, 
    scenario_delete
  }