import findOne from "../../../repositories/findOne/findOne.js";

const getOneUserByUsername = async (req,res) => {
  const db = req.db;
  const username = req.body.username;
  const user = await findOne(db.User, {username: username});
  res.json(user);
}

export default getOneUserByUsername;