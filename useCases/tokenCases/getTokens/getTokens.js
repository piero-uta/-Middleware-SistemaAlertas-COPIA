import findAll from "../../../repositories/findAll/findAll.js";

// Obtiene todos los tokens
const getTokens = async (req,res) =>{
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const tokens = await findAll(db.Token);
  res.json(tokens);
}



export default getTokens;