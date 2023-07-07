import saveOne from "../../../repositories/saveOne/saveOne.js";

// Se guarda un usuario con username, name, address y password
const  saveUser = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const {username, name, address, password} = req.body;
  const user = await saveOne(db.User, {username, name, address, password});
  await user.save();


  res.json(user);
}
export default saveUser;