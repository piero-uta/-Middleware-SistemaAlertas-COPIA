import mongoose from "mongoose";
import getDateChile from "../../../utils/getDateChile.js";
import saveOne from "../../../repositories/saveOne/saveOne.js";

var dateOptions = { timeZone: "UTC", weekday: 'short', year: 'numeric', month: '2-day', day: 'numeric' };

const saveAlertWithSender = async (req,res) => {
  const db = req.db;
  const {senderId} = req.body;
  const alert = await saveOne(db.Alert, {sender: new mongoose.Types.ObjectId(senderId), date: new Date().toLocaleString( "es-CL", dateOptions) })
  res.json(alert);
}

export default saveAlertWithSender;

