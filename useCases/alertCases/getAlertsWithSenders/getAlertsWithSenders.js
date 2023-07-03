const getAlertsWithSenders = async (req,res) => {
  const db = req.db;

  const alerts = await db.Alert.aggregate([
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
  
}
export default getAlertsWithSenders;