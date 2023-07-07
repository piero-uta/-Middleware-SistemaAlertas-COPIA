import userSchema from '../useCases/userCases/User.schema.js';
import tokenSchema from '../useCases/tokenCases/Token.schema.js';
import alertSchema from '../useCases/alertCases/Alert.schema.js';
import conns from "./connection/dbConn.js";
import getDateChile from '../utils/getDateChile.js';
import copyUsersModelAtoModelB from './copyData/copyUsersModelAtoModelB.js'
import copyTokensModelAtoModelB from './copyData/copyTokensModelAtoModelB.js';
import copyAlertsModelAtoModelB from './copyData/copyAlertsModelAtoModelB.js';

// Mapa de bases de datos, donde primaria es 0 y secundaria es 1
const  dbMap  = {
  primaria: 0,
  secundaria: 1
}

// Se crean los modelos de usuario, token y alerta para ambas bases de datos
var userModels = []
var tokenModels = []
var alertModels = []

// Se agregan los modelos de usuario, token y alerta a los arreglos userModels, tokenModels y alertModels
conns.forEach(conn => {
  userModels.push(conn.model('User',userSchema));
  tokenModels.push(conn.model('Token', tokenSchema));
  alertModels.push(conn.model('Alert', alertSchema));
});

export {dbMap, conns, userModels, tokenModels, alertModels, getDateChile, copyUsersModelAtoModelB, copyTokensModelAtoModelB, copyAlertsModelAtoModelB};