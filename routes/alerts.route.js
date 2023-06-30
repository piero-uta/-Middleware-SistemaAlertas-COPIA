import express from 'express';
const alertsRouter = express.Router();

alertsRouter.get('/', async function(req,res){
  const db = req.db;
  res.json(await db.getAlertsWithSenders());
  
});
alertsRouter.post('/save', async function(req,res){
  const db = req.db;
  const {senderId} = req.body;
  res.json(await db.saveAlertWithSender(senderId));
});


export default alertsRouter;