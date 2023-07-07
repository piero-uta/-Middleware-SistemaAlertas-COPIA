import mongoose from "mongoose";

// Se define el esquema de la alerta, con el id del usuario que la envió y la fecha en que se envió
const alertSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date
}
);
export default alertSchema;