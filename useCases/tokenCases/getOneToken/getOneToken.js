const getOneToken = async (req,res) => {
  const db = req.db;
  const token = req.params.token;
  const result = await db.Token.findOne({token: token});
  res.json(result);  
}

export default getOneToken;