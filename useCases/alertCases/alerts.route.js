import express from 'express';
import getAlertsWithSenders from './getAlertsWithSenders/getAlertsWithSenders.js';
import saveAlertWithSender from './saveAlertWithSender/saveAlertWithSender.js';

// Se crea el router para las alertas
const alertsRouter = express.Router();

// Se definen las rutas para las alertas
alertsRouter.get('/', getAlertsWithSenders);
alertsRouter.post('/save', saveAlertWithSender);


export default alertsRouter;