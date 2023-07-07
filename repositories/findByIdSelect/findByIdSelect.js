// Obtiene un registro de una coleccion por su id y lo filtra por los campos que se le indiquen
const findByIdSelect = async (model, id, selection) => {
  const document = await model.findById(id).select(selection);
  return document;
}
export default findByIdSelect;