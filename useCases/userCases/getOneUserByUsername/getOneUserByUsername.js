import findOne from "../../../repositories/findOne/findOne.js";

// Obtiene un usuario por su username
const getOneUserByUsername = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const username = req.body.username;
  const user = await findOne(db.User, {username: username});
  res.json(user);
}

export default getOneUserByUsername;