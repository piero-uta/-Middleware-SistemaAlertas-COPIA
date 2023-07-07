import cron from "node-cron";
import { dbMap, conns, userModels, tokenModels, alertModels, getDateChile } from "./dbModules.js";

/**
 * @class dbData
 * @description Clase que permite manejar las bases de datos primaria y secundaria
 * @property {Object} primaria - Objeto que contiene la base de datos primaria
 * @property {Object} secundaria - Objeto que contiene la base de datos secundaria
 * @property {boolean} primariaReady - Variable que indica si la base de datos primaria está conectada
 * @property {boolean} secundariaReady - Variable que indica si la base de datos secundaria está conectada
 * @property {Object} User - Objeto que contiene el modelo de usuario
 * @property {Object} Token - Objeto que contiene el modelo de token
 * @property {Object} Alert - Objeto que contiene el modelo de alerta
 * @property {Method} planificadorCopias - Función que permite planificar la copia de datos de la base de datos primaria a la secundaria
 * @property {Method} useModels - Función que permite usar los modelos de usuario, token y alerta de la base de datos primaria o secundaria
 * @property {Method} verifyDbsReady - Función que permite verificar si alguna base de datos está conectada
 */  
class dbData {
  /**
   * @constructor
   * @description Método constructor de la clase
   * @returns {void}
   */
  constructor () {
    this.primaria = conns[dbMap.primaria];
    this.secundaria = conns[dbMap.secundaria];
    this.primariaReady = true;
    this.secundariaReady = true;
    this.User = userModels[dbMap.primaria];
    this.Token = tokenModels[dbMap.primaria];
    this.Alert = alertModels[dbMap.primaria];  
    this.planificadorCopias();
  }

  /**
   * @method planificadorCopias
   * @description Método que permite planificar la copia de datos de la base de datos primaria a la secundaria
   * @returns {void}
    */
  planificadorCopias() {
    // Se realiza una copia de la base de datos primaria a la secundaria, todos los dias a las 12 de la noche
    cron.schedule('0 0 0 * * *',()=>{
      // Verifica si la base de datos primaria y secundaria están conectadas
      if (this.primariaReady && this.secundariaReady){
        // Primero se eliminan todos los datos de la base de datos secundaria, para luego copiar los datos de la base de datos primaria
        Promise.all([userModels[dbMap.secundaria].deleteMany({}),tokenModels[dbMap.secundaria].deleteMany({}),alertModels[dbMap.secundaria].deleteMany({})])
        Promise.all([copyUsersModelAtoModelB(userModels[dbMap.primaria],userModels[dbMap.secundaria]),copyTokensModelAtoModelB(tokenModels[dbMap.primaria],tokenModels[dbMap.secundaria])],copyAlertsModelAtoModelB(alertModels[dbMap.primaria],alertModels[dbMap.secundaria]));
        console.log('copy primaria to secundaria', getDateChile());
        }
    }, {
      scheduled: true,
      timezone: "America/Santiago"
    });  
  }

  /**
   * @method useModels
   * @description Método que permite usar los modelos de usuario, token y alerta de la base de datos primaria o secundaria
   * @param {number} dbMapModel - Número que indica si se usará la base de datos primaria o secundaria (0 o 1)
   * @returns {void}
   */
  useModels(dbMapModel) {
    console.log(`use models ${dbMapModel}`, getDateChile());
    this.User = userModels[dbMapModel];
    this.Token = tokenModels[dbMapModel];
    this.Alert = alertModels[dbMapModel];
  }

  /**
   * @method verifyDbsReady
   * @description Método que permite verificar si alguna base de datos está conectada
   * @returns {void}
   * @throws {Error} - Error que indica que ninguna base de datos está conectada
   */
  verifyDbsReady () {
    if (!this.primariaReady && !this.secundariaReady) {
      throw new Error('Any Database connected',getDateChile());
    }
  }
}

export default dbData;