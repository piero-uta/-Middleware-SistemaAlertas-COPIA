import express from 'express';
import getAlertsWithSenders from './getAlertsWithSenders/getAlertsWithSenders.js';
import saveAlertWithSender from './saveAlertWithSender/saveAlertWithSender.js';

const alertsRouter = express.Router();

alertsRouter.get('/', getAlertsWithSenders);
alertsRouter.post('/save', saveAlertWithSender);


export default alertsRouter;