const getTokens = async (req,res) =>{
  const db = req.db;
  const tokens = await db.Token.find({});
  res.json(tokens);
}



export default getTokens;