import mongoose from "mongoose";
import getDateChile from "../../../utils/getDateChile.js";
import saveOne from "../../../repositories/saveOne/saveOne.js";

const saveAlertWithSender = async (req,res) => {
  const db = req.db;
  const {senderId} = req.body;
  const alert = await saveOne(db.Alert, {sender: new mongoose.Types.ObjectId(senderId), date: new Date().toLocaleString( "es-CL", {timeZone: "UTC"}) })
  res.json(alert);
}

export default saveAlertWithSender;

