const express = require('express');
const scenarioController = require('../controllers/scenarioController');

const router = express.Router();

router.get('/createScenario', scenarioController.scenario_create_get);
router.get('/scenario', scenarioController.scenario_index);
router.post('/scenario', scenarioController.scenario_create_post);
router.get('/:id', scenarioController.scenario_details);
router.delete('/:id', scenarioController.scenario_delete);

module.exports = router;