const getOneUserById = async (req,res) =>{
  const id = req.body.id;
  const db = req.db;
  const user = await db.User.findById(id).select('-password');
  res.json(user);
}


export default getOneUserById;