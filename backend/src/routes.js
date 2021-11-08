const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const authMiddleware = require('./middlewares/auth');

// Routes that do not need authentication must come before middleware 

routes.post('/register_ongs', OngController.create);

routes.post('/authenticate', SessionController.authenticate);

routes.use(authMiddleware);

routes.get('/ongs', OngController.index);

routes.get('/profile', ProfileController.index);

routes.post('/register_incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/delete_incidents/:id', IncidentController.delete);

module.exports = routes;