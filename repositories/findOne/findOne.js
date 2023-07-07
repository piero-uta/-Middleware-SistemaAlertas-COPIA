// Obtiene un registro de una coleccion por sus propiedades
const findOne = async (model, props) =>{
  return await model.findOne(props);
}
export default findOne;