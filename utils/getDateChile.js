function getDateChile(){
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset()*60000;
  const utc = localTime + localOffset;
  const offset = -4;
  const chile = utc + (3600000 * offset);
  const dateChile = new Date(chile)
  return dateChile;
}

export default getDateChile;