// Encuentra todos los registros de una colección
const findAll = async (model) =>{
  return await model.find({});
}
export default findAll;