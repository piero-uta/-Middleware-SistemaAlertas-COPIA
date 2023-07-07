import mongoose from "mongoose";
import getDateChile from "../../../utils/getDateChile.js";
import saveOne from "../../../repositories/saveOne/saveOne.js";

const moment = require('moment-timezone');
const dateChile = moment.tz(Date.now(), "America/Santiago");


const saveAlertWithSender = async (req,res) => {
  const db = req.db;
  const {senderId} = req.body;
  const alert = await saveOne(db.Alert, {sender: new mongoose.Types.ObjectId(senderId), date: dateChile})
  res.json(alert);
}

export default saveAlertWithSender;

