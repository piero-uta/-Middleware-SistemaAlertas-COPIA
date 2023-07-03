const findAll = async (model) =>{
  return await model.find({});
}
export default findAll;