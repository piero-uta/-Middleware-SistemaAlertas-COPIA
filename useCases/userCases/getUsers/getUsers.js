import findAllSelect from "../../../repositories/findAllSelect/findAllSelect.js";

// Obtiene todos los usuarios sin el campo password
const  getUsers = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const users = await findAllSelect(db.User, '-password');
  res.json(users);
}


export default getUsers