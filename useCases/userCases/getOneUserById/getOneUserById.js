import findByIdSelect from "../../../repositories/findByIdSelect/findByIdSelect.js";

// Obtiene un usuario por su id y sin el campo password
const getOneUserById = async (req,res) =>{
  // Se obtiene la conexión a la base desde el request
  const id = req.body.id;
  const db = req.db;
  const user = await findByIdSelect(db.User, id, '-password');

  res.json(user);
}


export default getOneUserById;