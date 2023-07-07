import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

var conns = []

// Se intenta conectar a la base de datos primaria
try {
  // Se agrega la conexión a la base de datos primaria al arreglo de conexiones
  conns.push(await mongoose.createConnection(process.env.MONGODB, { useNewUrlParser: true }).asPromise());
} catch (err) {
  console.error("Error en la conexión a la base de datos primaria:", err);
}

// Se intenta conectar a la base de datos secundaria
try {
  // Se agrega la conexión a la base de datos secundaria al arreglo de conexiones
  conns.push(await mongoose.createConnection(process.env.MONGODB2, { useNewUrlParser: true }).asPromise());
} catch (err) {
  console.error("Error en la conexión a la base de datos secundaria:", err);
}    

export default conns;