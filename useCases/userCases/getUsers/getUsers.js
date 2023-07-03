import findAllSelect from "../../../repositories/findAllSelect/findAllSelect.js";

const  getUsers = async (req,res) => {
  const db = req.db;
  const users = await findAllSelect(db.User, '-password');
  res.json(users);
}


export default getUsers