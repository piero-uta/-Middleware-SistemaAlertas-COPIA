import findOne from "../../../repositories/findOne/findOne.js";

const getOneToken = async (req,res) => {
  const db = req.db;
  const token = req.params.token;

  const result = await findOne(db.token, {token: token});
  res.json(result);  
}

export default getOneToken;