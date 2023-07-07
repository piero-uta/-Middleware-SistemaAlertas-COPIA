import mongoose from "mongoose";

// Se define el esquema del usuario
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  address: String,
  password: String,
});
export default userSchema;