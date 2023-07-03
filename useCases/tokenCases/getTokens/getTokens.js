import findAll from "../../../repositories/findAll/findAll.js";

const getTokens = async (req,res) =>{
  const db = req.db;
  const tokens = await findAll(db.Token);
  res.json(tokens);
}



export default getTokens;