import mongoose from "mongoose";

// Se define el esquema del token
const tokenSchema = new mongoose.Schema({
  token: String
});
export default tokenSchema;