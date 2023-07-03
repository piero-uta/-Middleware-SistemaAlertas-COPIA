import findByIdSelect from "../../../repositories/findByIdSelect/findByIdSelect.js";

const getOneUserById = async (req,res) =>{
  const id = req.body.id;
  const db = req.db;
  const user = await findByIdSelect(db.User, id, '-password');

  res.json(user);
}


export default getOneUserById;