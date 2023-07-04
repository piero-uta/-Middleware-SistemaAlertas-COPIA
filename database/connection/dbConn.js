import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

var conns = []

try {
  conns.push(await mongoose.createConnection(process.env.MONGODB, { useNewUrlParser: true }).asPromise());
} catch (err) {
  console.error("Error en la conexión a la base de datos primaria:", err);
}
try {
  conns.push(await mongoose.createConnection(process.env.MONGODB2, { useNewUrlParser: true }).asPromise());
} catch (err) {
  console.error("Error en la conexión a la base de datos secundaria:", err);
  // secundaria = primaria;
}    

export default conns;