const findOneSelect = async (model,props, selection) =>{
  return await model.findOne(props).select(selection)
}
export default findOneSelect;