// Obtiene las alertas con los datos del usuario que la envio
const getAlertsWithSenders = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;

  // Se obtienen las alertas con los datos del usuario que la envio, se ordenan por fecha y se limitan a 20
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

  ]).sort({date: -1}).limit(20);
  
  // Se modifican los datos de las alertas para que solo se retornen los datos necesarios
  const alertsModificated = alerts.map(alert=>{
    return {
      _id: alert._id,
      name: alert.alertAndSender.name,
      address: alert.alertAndSender.address,
      date: alert.date
    }
  });

  // Se retornan las alertas con el formato modificado
  res.json(alertsModificated);
  
}
export default getAlertsWithSenders;