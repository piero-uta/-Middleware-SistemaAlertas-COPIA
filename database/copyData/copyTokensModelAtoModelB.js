// Se copian los registros de los tokens de la base de datos A a la base de datos B
const copyTokensModelAtoModelB = async(ModelA,ModelB) => {
  const tokens = await ModelA.find({});
  await Promise.all(
    tokens.map(async (token) => {
      const tokenB = new ModelB({
        token: token.token
      });
      await tokenB.save();
    })
  );
}

export default copyTokensModelAtoModelB;