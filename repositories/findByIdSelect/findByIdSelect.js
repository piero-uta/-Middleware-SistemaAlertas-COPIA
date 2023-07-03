const findByIdSelect = async (model, id, selection) => {
  const document = await model.findById(id).select(selection);
  return document;
}
export default findByIdSelect;