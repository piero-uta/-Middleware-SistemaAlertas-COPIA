// Se copian los registros de las usuarios de la base de datos A a la base de datos B
const copyUsersModelAtoModelB = async (ModelA, ModelB) => {
  const users = await ModelA.find({});
  await Promise.all(
    users.map(async (user) => {
      const userB = new ModelB({
        username: user.username,
        name: user.name,
        address: user.address,
        password: user.password,
      });
      await userB.save();
    })
  );
};

export default copyUsersModelAtoModelB;