import mongoose from "mongoose";
import getDateChile from "../../../utils/getDateChile.js";

const saveAlertWithSender = async (req,res) => {
  const db = req.db;
  const {senderId} = req.body;
  const alert = new db.Alert({
    sender: new mongoose.Types.ObjectId(senderId),
    date: getDateChile()
  });
  await alert.save(); 
  res.json(alert);
}

export default saveAlertWithSender;