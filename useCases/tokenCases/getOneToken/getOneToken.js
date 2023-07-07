import findOne from "../../../repositories/findOne/findOne.js";

// Obtiene un token por su valor
const getOneToken = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const token = req.params.token;
  const result = await findOne(db.Token, {token: token});
  res.json(result);  
}

export default getOneToken;