import findOneSelect from "../../../repositories/findOneSelect/findOneSelect.js";

// Obtiene un usuario por su id y sin el campo password
const getOneUser = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const id = req.body.id;
  const user = await findOneSelect(db.User, {_id: id}, '-password');  
  res.json(user);
}
export default getOneUser;