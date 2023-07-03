const getOneUserByUsername = async (req,res) => {
  const db = req.db;
  const username = req.body.username;
  const user = await db.User.findOne({username: username});
  res.json(user);
}

export default getOneUserByUsername;