// Se guarda un token
const saveToken = async (req,res) =>{
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const token = req.body.token;
  const myToken = new db.Token({token});
  await myToken.save();  
  res.json(myToken);
}

export default saveToken;