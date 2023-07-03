const findAllSelect = async (model, selection) =>{
  return await model.find({}).select(selection);
}
export default findAllSelect;