const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');

routes.get('/ongs', OngController.index)
routes.post('/register_ongs', OngController.create);

routes.post('/authenticate', SessionController.authenticate);

module.exports = routes;