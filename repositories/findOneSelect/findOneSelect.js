// Obtiene un registro de una colección por sus propiedades y lo filtra por los campos que se le indiquen
const findOneSelect = async (model,props, selection) =>{
  return await model.findOne(props).select(selection)
}
export default findOneSelect;