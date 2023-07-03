const  getUsers = async (req,res) => {
  const db = req.db;
  const users = await db.User.find({}).select('-password');
  res.json(users);
}


export default getUsers