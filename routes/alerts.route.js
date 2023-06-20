import express from 'express';
import mongoose from 'mongoose';
const alertsRouter = express.Router();


alertsRouter.get('/', async function(req,res){
  const Alert = req.datos.Alert;
  const alerts = await Alert.aggregate([
    {
      $lookup: 
      {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "alertAndSender"
      }
    },
    {$unwind: "$alertAndSender"}

  ])  
  //ultimas 20
  .sort({date: -1}).limit(20);
  
  const alertsModificated = alerts.map(alert=>{
    return {
      _id: alert._id,
      name: alert.alertAndSender.name,
      address: alert.alertAndSender.address,
      date: alert.date
    }
  });
  res.json(alertsModificated);
  
});
alertsRouter.post('/save', async function(req,res){
  const Alert = req.datos.Alert;
  const {senderId} = req.body;
  const alert = new Alert({
    sender: new mongoose.Types.ObjectId(senderId),
    date: getDateChile()
  });
  await alert.save();
  res.json(alert);
});


export default alertsRouter;