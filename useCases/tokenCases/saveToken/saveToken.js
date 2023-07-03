const saveToken = async (req,res) =>{
  const db = req.db;
  const token = req.body.token;
  const myToken = new db.Token({token});
  await myToken.save();  
  res.json(myToken);
}

export default saveToken;