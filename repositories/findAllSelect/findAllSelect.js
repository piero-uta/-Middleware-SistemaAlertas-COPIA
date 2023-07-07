// Obtiene todos los registros de una coleccion y los filtra por los campos que se le indiquen
const findAllSelect = async (model, selection) =>{
  return await model.find({}).select(selection);
}
export default findAllSelect;