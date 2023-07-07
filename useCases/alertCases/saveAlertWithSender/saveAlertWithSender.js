import mongoose from "mongoose";
import saveOne from "../../../repositories/saveOne/saveOne.js";
import moment from 'moment-timezone';

const saveAlertWithSender = async (req,res) => {
  const db = req.db;
  const {senderId} = req.body;
  const alert = await saveOne(db.Alert, {sender: new mongoose.Types.ObjectId(senderId), date: moment.tz(Date.now(), "America/Santiago")})
  res.json(alert);
}

export default saveAlertWithSender;

