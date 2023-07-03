const findOne = async (model, props) =>{
  return await model.findOne(props);
}
export default findOne;