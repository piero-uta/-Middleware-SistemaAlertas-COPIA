// Se copian los registros de las alertas de la base de datos A a la base de datos B
const copyAlertsModelAtoModelB = async (ModelA, ModelB) => {
  const alerts = await ModelA.find({});
  await Promise.all(
    alerts.map(async (alert) => {
    const alertB = new ModelB({
        sender: alert.sender,
        createdAt: alert.createdAt,
        updatedAt: alert.updatedAt
      });
      await alertB.save();
    })
  );
};

export default copyAlertsModelAtoModelB;