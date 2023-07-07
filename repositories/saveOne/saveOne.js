// Guarda un registro en una colección, recibe el modelo y las propiedades del registro a guardar
const saveOne = async (model, props) =>{
  const document = model(props);
  return await document.save(); 

}
export default saveOne;