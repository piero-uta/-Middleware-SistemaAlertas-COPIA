import { dbMap, conns, userModels, tokenModels, alertModels } from "./dbModules.js";

var dbData = {
  primaria : conns[dbMap.primaria],
  secundaria : conns[dbMap.secundaria],
  primariaReady : true,
  secundariaReady : true,
  User : userModels[dbMap.primaria],
  Token : tokenModels[dbMap.primaria],
  Alert : alertModels[dbMap.primaria]
}

export default dbData;