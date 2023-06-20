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