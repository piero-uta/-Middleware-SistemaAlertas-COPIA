const getOneUser = async (req,res) => {
  const db = req.db;
  const user = await db.User.findOne({_id: id}).select('-password');  
  res.json(user);
}
export default getOneUser;