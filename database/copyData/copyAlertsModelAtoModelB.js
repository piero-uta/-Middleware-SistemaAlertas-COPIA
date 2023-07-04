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