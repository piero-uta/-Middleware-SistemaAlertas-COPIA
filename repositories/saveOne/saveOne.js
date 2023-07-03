const saveOne = async (model, props) =>{
  const document = model(props);
  return await document.save(); 

}
export default saveOne;