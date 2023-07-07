import {dbMap, userModels, tokenModels, alertModels, getDateChile, copyUsersModelAtoModelB, copyTokensModelAtoModelB, copyAlertsModelAtoModelB} from './dbModules.js';
import dbData from './dbData.js';

/**
 * @class dbConmutador
 * @description Clase que permite conmutar entre las bases de datos primaria y secundaria
 * @property {Object} data - Objeto que contiene las bases de datos primaria y secundaria, además de los modelos de usuario, token y alerta
 */
class dbConmutador {
  /**
   * @constructor
   * @description Método constructor de la clase
   * @returns {void}
    */
  constructor(){
    this.data = new dbData();
    this.inicializar();
  }

  /**
   * @method inicializar
   * @description Método que inicializa el conmutador de bases de datos
   * @returns {void}
   * @throws {Error} - Error que indica que no hay ninguna base de datos conectada
   */
  inicializar(){
    // Si la base de datos primaria está conectada, se usa, si no, se usa la secundaria
    this.data.primaria.on('connected', () => {this.usePrimaria();});
    this.data.primaria.on('disconnected', () => {this.useSecundaria();});
    // Si la base de datos secundaria está conectada, se cambia el estado de la variable secundariaReady a true
    this.data.secundaria.on('connected', () => {this.data.secundariaReady = true;});
    // Si no está conectada, se cambia el estado de la variable secundariaReady a false y se verifica si hay alguna base de datos conectada
    this.data.secundaria.on('disconnected', () => {this.data.secundariaReady = false; this.data.verifyDbsReady();});  
  }

  /**
   * @method usePrimaria
   * @description Método que permite usar la base de datos primaria
   * @returns {void}
   */
  usePrimaria(){
    // Si la base de datos secundaria está conectada, se copian los datos de la base de datos secundaria a la primaria
    if (this.data.secundariaReady){
      Promise.all([userModels[dbMap.primaria].deleteMany({}),tokenModels[dbMap.primaria].deleteMany({}),alertModels[dbMap.primaria].deleteMany({})])
      Promise.all([copyUsersModelAtoModelB(userModels[dbMap.secundaria],userModels[dbMap.primaria]),copyTokensModelAtoModelB(tokenModels[dbMap.secundaria],tokenModels[dbMap.primaria]),copyAlertsModelAtoModelB(alertModels[dbMap.secundaria],alertModels[dbMap.primaria])])
      console.log("copy secundaria to primaria",getDateChile());
    }
    // Se utiliza la base de datos primaria
    this.data.useModels(dbMap.primaria);    
    this.data.primariaReady = true;      
  }

  /**
   * @method useSecundaria
   * @description Método que permite usar la base de datos secundaria
   * @returns {void}
   */
  useSecundaria(){
    // Se verifica si hay alguna base de datos conectada
    this.data.verifyDbsReady();
    // Se utiliza la base de datos secundaria
    this.data.useModels(dbMap.secundaria);  
    this.data.primariaReady = false;  
  }

  /**
   * @method User
   * @description Método que retorna el modelo de usuario de la base de datos que se está usando
   * @returns {Object} - Modelo de usuario de la base de datos que se está usando
    */
  get User(){return this.data.User;}

  /**
   * @method Token
   * @description Método que retorna el modelo de token de la base de datos que se está usando
   * @returns {Object} - Modelo de token de la base de datos que se está usando
   */
  get Token(){return this.data.Token;}

  /**
   * @method Alert
   * @description Método que retorna el modelo de alerta de la base de datos que se está usando
   * @returns {Object} - Modelo de alerta de la base de datos que se está usando
   */ 
  get Alert(){return this.data.Alert;}
}
export default dbConmutador;