import findOneSelect from "../../../repositories/findOneSelect/findOneSelect.js";

const getOneUser = async (req,res) => {
  const db = req.db;
  const id = req.body.id;
  const user = await findOneSelect(db.User, {_id: id}, '-password');  
  res.json(user);
}
export default getOneUser;