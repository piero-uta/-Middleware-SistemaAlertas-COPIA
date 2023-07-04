import saveOne from "../../../repositories/saveOne/saveOne.js";

const  saveUser = async (req,res) => {
  const db = req.db;
  const {username, name, address, password} = req.body;
  const user = await saveOne(db.User, {username, name, address, password});
  await user.save();


  res.json(user);
}
export default saveUser;