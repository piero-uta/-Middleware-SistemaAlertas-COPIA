import mongoose, { get } from "mongoose";
import getDateChile from "../../../utils/getDateChile.js";
import saveOne from "../../../repositories/saveOne/saveOne.js";

// Se guarda una alerta con el id del usuario que la envió
const saveAlertWithSender = async (req,res) => {
  // Se obtiene la conexión a la base desde el request
  const db = req.db;
  const {senderId} = req.body;
  const alert = await saveOne(db.Alert, {sender: new mongoose.Types.ObjectId(senderId), date: getDateChile()})
  res.json(alert);
}

export default saveAlertWithSender;

